import { DateTime } from "luxon";
import { otpCodeType } from "../../../../Constants/constants.js";
import BrandOwnerModel from "../../../../Database/Models/brand-owner.model.js";
import { emitter } from "../../../../Services/sendEmail.service.js";
import emailTemplate from "../../../../Templates/sendVirficatioEmail.templets.js";
import { comparing } from "../../../../Utils/crypto.utils.js";
import genOtp from "../../../../Utils/genOtp.utils.js";
import { genAccessToken, genRefreshToken } from "../../../../Utils/genTokens.utils.js";
// import logger from "../../../../Utils/logger.utils.js";

// brand owner signup services
export const brandOwnerSignUpService = async (req, res) => {
    const ownerData = req.body;

    // logger.info(`Signup attempt for email: ${ownerData.email}`);

    const isEmailExist = await BrandOwnerModel.findOne({ email: ownerData.email })
    if (isEmailExist) {
        // logger.warn(`Signup failed - Email already exists: ${ownerData.email}`);
        return res.status(409).json({ message: 'email already exist' });
    }

    const { otp, hashedOtp, otpExpiration } = genOtp()
    ownerData.brandOtps = {
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.VERIFY_ACCOUNT
    };

    emitter.emit('sendEmail', {
        subject: "Welcome in Click Shop",
        to: ownerData.email,
        html: emailTemplate(
            ownerData.brandName,
            otp,
            'Verify your brand email'
        )
    })

    await BrandOwnerModel.create(ownerData)

    res.status(201).json({ message: 'Your Brand Created Successfully' })
}

// verify user account
export const verifyAccountService = async (req, res) => {
    const { email, otp } = req.body;

    const owner = await BrandOwnerModel.findOne({ email });

    if (!owner) return res.status(404).json({ message: "owner not found" });

    if (owner.isEmailConfirmed) return res.status(409).json({ message: "Email already verified" });

    if (!owner.brandOtps || owner.brandOtps.length === 0) {
        return res.status(400).json({ message: 'no otp found' });
    }

    const otps = owner.brandOtps.filter(item => item.codeType === otpCodeType.VERIFY_ACCOUNT)

    const latestOtp = otps[otps.length - 1];
    if (!latestOtp) {
        return res.status(409).json({ message: "Invalid OTP" });
    }

    const { code, expDate } = latestOtp;
    const isOtpMatch = await comparing(otp, code)
    if (!isOtpMatch) return res.status(409).json({ message: 'invalid otp' })
    if (DateTime.now() > expDate) return res.status(400).json({ message: 'otp has expired' });
    await BrandOwnerModel.updateOne(
        { _id: owner._id },
        {
            $set: { isEmailConfirmed: true },
            $pull: { brandOtps: { codeType: otpCodeType.VERIFY_ACCOUNT } }
        }
    );
    res.status(200).json({ message: 'Email confirmed successfully' })
}


// brand owner login 
export const brandOwnerLoginService = async (req, res) => {
    const ownerData = req.body;

    const owner = await BrandOwnerModel.findOne({ email: ownerData.email })
    if (!owner) return res.status(404).json({ message: 'wrong email or password' })

    const password = await comparing(ownerData.password, owner.password)
    if (!password) return res.status(409).json({ message: 'wrong email or password' })

    const accesstoken = genAccessToken(owner)
    const refreshtoken = genRefreshToken(owner)

    res.status(200).json({ message: 'Login successfully', accesstoken, refreshtoken })
}

// resend otp service
export const resendOtpService = async (req, res) => {
    const { email } = req.body;

    const owner = await BrandOwnerModel.findOne({ email });
    if (!owner) return res.status(404).json({ message: "owner not found" });

    if (owner.isEmailConfirmed) return res.status(409).json({ message: "Email already verified" });

    const otps = owner.brandOtps?.filter(item => item.codeType === otpCodeType.VERIFY_ACCOUNT) || [];
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

    owner.brandOtps.push(newOtp);
    await owner.save();

    emitter.emit("sendEmail", {
        subject: "Verify your brand email",
        to: owner.email,
        html: emailTemplate(owner.brandName, otp, "Verify your brand email"),
    });

    res.status(200).json({ message: "New OTP sent successfully" });
};

// forget password
export const forgetPasswordService = async (req, res) => {
    const { email } = req.body;

    const owner = await BrandOwnerModel.findOne({ email });
    if (!owner) return res.status(404).json({ message: 'owner not found' });

    const { otp, hashedOtp, otpExpiration } = genOtp();

    owner.brandOtps.push({
        code: hashedOtp,
        expDate: otpExpiration,
        codeType: otpCodeType.RESET_PASSWORD,
    });

    emitter.emit('sendEmail', {
        subject: "Reset code",
        to: owner.email,
        html: emailTemplate(owner.brandName, otp, `Reset your password`),
    });

    await owner.save();

    res.status(200).json({ message: 'OTP was sent successfully' });
};

// reset password
export const resetPasswordService = async (req, res) => {
    const { email, otp, password, confirmedPassword } = req.body;

    const owner = await BrandOwnerModel.findOne({ email });
    if (!owner) return res.status(404).json({ message: 'owner not found' });

    if (!owner.brandOtps || owner.brandOtps.length === 0) {
        return res.status(400).json({ message: 'No OTP found' });
    }

    const otps = owner.brandOtps.filter(
        item => item.codeType === otpCodeType.RESET_PASSWORD
    );

    const latestOtp = otps[otps.length - 1];
    if (!latestOtp) {
        return res.status(409).json({ message: "Invalid OTP" });
    }

    const { code, expDate } = latestOtp;

    const isOtpMatch = await comparing(otp, code);
    if (!isOtpMatch) {
        return res.status(409).json({ message: 'Invalid OTP' });
    }

    if (DateTime.now() > DateTime.fromJSDate(new Date(expDate))) {
        return res.status(400).json({ message: 'OTP has expired' });
    }

    owner.brandOtps = owner.brandOtps.filter(
        item => item.codeType !== otpCodeType.RESET_PASSWORD
    );

    owner.password = password;
    await owner.save();

    res.status(200).json({ message: 'Password reset successfully' });
};
