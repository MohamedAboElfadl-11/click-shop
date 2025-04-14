import { DateTime } from "luxon";
import CustomerModel from "../../../../Database/Models/customer.model.js";
import { emitter } from "../../../../Services/sendEmail.service.js";
import emailTemplate from "../../../../Templates/sendVirficatioEmail.templets.js";
import { comparing } from "../../../../Utils/crypto.utils.js";
import genOtp from "../../../../Utils/genOtp.utils.js";
import { otpCodeType } from "../../../../Constants/constants.js";
import BlackListTokensModel from "../../../../Database/Models/blackListTokens.model.js";
import { genAccessToken, genRefreshToken } from "../../../../Utils/genTokens.utils.js";
import jwt from 'jsonwebtoken'

// signup service create user account
export const signupService = async (req, res) => {
    const userDate = req.body;
    const isUserExist = await CustomerModel.findOne({
        $or: [{ email: userDate.email }, { username: userDate.username }]
    });
    if (isUserExist) return res.status(400).json({ message: "user already exist" });
    const { otp, hashedOtp, otpExpiration } = genOtp()
    userDate.userOtps = {
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.VERIFY_ACCOUNT
    };
    emitter.emit('sendEmail', {
        subject: "Your verification code",
        to: userDate.email,
        html: emailTemplate(userDate.firstName, otp, `Verify your Account`)
    })
    await CustomerModel.create(userDate);
    res.status(200).json({ message: 'Account created successfully, please check your mail box to confirm your account' });
}

// verify user account
export const verifyAccountService = async (req, res) => {
    const { email, otp } = req.body;
    const user = await CustomerModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    if (user.isAccountConfirmed) return res.status(409).json({ message: "Email already verified" });

    if (!user.userOtps || user.userOtps.length === 0) {
        return res.status(400).json({ message: 'no otp found' });
    }

    let userOtp = null;
    for (const item of user.userOtps) {
        if (item.codeType === otpCodeType.VERIFY_ACCOUNT) {
            userOtp = item;
            break;
        }
    }

    if (!userOtp) return res.status(409).json({ message: 'invalid otp' })
    const { code, expDate } = userOtp;
    const isOtpMatch = await comparing(otp, code)
    if (!isOtpMatch) return res.status(409).json({ message: 'invalid otp' })
    if (DateTime.now() > expDate) return res.status(400).json({ message: 'otp has expired' });
    await CustomerModel.updateOne(
        { _id: user._id },
        {
            $set: { isAccountConfirmed: true },
            $pull: { userOtps: { codeType: otpCodeType.VERIFY_ACCOUNT } }
        }
    );
    res.status(200).json({ message: 'Account confirmed successfully' })
}

// login service
export const loginService = async (req, res) => {
    const userCredentials = req.body;
    const user = await CustomerModel.findOne({
        $or: [{ email: userCredentials.email }, { username: userCredentials.username }]
    })

    if (!user
        || (user.deletedAt && user.deletedAt <= new Date())
        || (user.bannedAt && user.bannedAt <= new Date())
    ) return res.status(400).json({ message: "wrong email or password" })

    const password = await comparing(userCredentials.password, user.password);
    if (!password) return res.status(400).json({ message: "wrong email or password" })
    user.lastLogin = new Date()
    await user.save()
    const accesstoken = genAccessToken(user)
    const refreshtoken = genRefreshToken(user)
    res.status(200).json({ message: 'Login successfully', tokens: { accesstoken, refreshtoken } })
}

// resend otp service
export const resendOtpService = async (req, res) => {
    const { email } = req.body;

    const customer = await CustomerModel.findOne({ email });
    if (!customer) return res.status(404).json({ message: "owner not found" });

    if (customer.isAccountConfirmed) return res.status(409).json({ message: "Email already verified" });

    const otps = customer.userOtps?.filter(item => item.codeType === otpCodeType.VERIFY_ACCOUNT) || [];
    const latestOtp = otps[otps.length - 1];

    if (
        latestOtp &&
        latestOtp.expDate &&
        DateTime.now() < DateTime.fromJSDate(new Date(latestOtp.expDate))
    ) {
        return res.status(400).json({
            message: "A valid OTP already exists. Please wait until it expires.",
        });
    }

    const { otp, hashedOtp, otpExpiration } = genOtp();

    const newOtp = {
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.VERIFY_ACCOUNT,
    };

    customer.userOtps.push(newOtp);
    await customer.save();

    emitter.emit("sendEmail", {
        subject: "Verify your brand email",
        to: customer.email,
        html: emailTemplate(customer.brandName, otp, "Verify your brand email"),
    });

    res.status(200).json({ message: "New OTP sent successfully" });
};

// forget password
export const forgetPasswordSeervice = async (req, res) => {
    const { email } = req.body;
    const user = await CustomerModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'user not foun or user not verified' });
    const { otp, hashedOtp, otpExpiration } = genOtp()
    user.userOtps.push({
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.RESET_PASSWORD
    });
    emitter.emit('sendEmail', {
        subject: "Reset code",
        to: user.email,
        html: emailTemplate(user.firstName, otp, `Reset your password`)
    })
    await user.save()
    res.status(200).json({ message: 'otp was sended successfully' })
}

// reset password
export const resetPasswordService = async (req, res) => {

    const { email, otp, password, confirmedPassword } = req.body;
    const user = await CustomerModel.findOne({ email });

    if (!user) return res.status(404).json({ message: 'user not found' });

    if (!user.userOtps || user.userOtps.length === 0) {
        return res.status(400).json({ message: 'no otp found' });
    }

    let userOtp = null;
    for (const item of user.userOtps) {
        if (item.codeType === otpCodeType.RESET_PASSWORD) {
            userOtp = item;
            break;
        }
    }

    if (!userOtp) return res.status(409).json({ message: 'invalid otp' })
    const { code, expDate } = userOtp;
    const isOtpMatch = await comparing(otp, code)
    if (!isOtpMatch) return res.status(409).json({ message: 'invalid otp' })
    if (DateTime.now() > expDate) return res.status(400).json({ message: 'otp has expired' });
    await CustomerModel.updateOne(
        { _id: user._id },
        {
            $pull: { userOtps: { codeType: otpCodeType.RESET_PASSWORD } }
        }
    );
    user.password = password
    await user.save()
    res.status(200).json({ message: 'password reset successfully' })
}

// refresh token services 
export const refreshTokenService = async (req, res) => {

    const { refreshtoken } = req.headers;

    const decodedRefreshToken = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN)

    console.log(decodedRefreshToken)

    const isRefreshTokenBlacklisted = await BlackListTokensModel.findOne({ tokenId: decodedRefreshToken.jti });
    if (isRefreshTokenBlacklisted) return res.status(400).json({ message: "Token already blacklisted" })

    const accesstoken = genAccessToken(decodedRefreshToken)

    res.status(200).json({ message: "Token refershed successfully", accesstoken });
}

// logout service
export const logoutService = async (req, res) => {
    const { tokenId, expiryDate } = req.loginUser.token;
    const { refreshtoken } = req.headers
    const decodedRefreshToken = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN)
    const existingTokens = await BlackListTokensModel.find({
        tokenId: { $in: [tokenId, decodedRefreshToken.jti] }
    });
    if (existingTokens.length > 0) {
        return res.status(400).json({ message: "Token already blacklisted" });
    }
    await BlackListTokensModel.insertMany([
        {
            tokenId, expiryDate
        },
        {
            tokenId: decodedRefreshToken.jti,
            expiryDate: decodedRefreshToken.exp
        }
    ]);
    res.status(200).json({ message: "User logged out successfully" });
}