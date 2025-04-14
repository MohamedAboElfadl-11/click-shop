import { legalStatus } from "../../../../Constants/constants.js"
import { comparing } from "../../../../Utils/crypto.utils.js"

// get profile services
export const brandProfileService = async (req, res) => {
    const owner = req.loginUser
    const brandProfile = {
        brandName: owner.brandName,
        brandType: owner.brandType,
        address: owner.address,
        city: owner.city,
        country: owner.country,
        phone: owner.phone,
        isVerified: owner.isVerified
    }
    res.status(200).json({ brandProfile })
}

// update profile
export const updateBrandProfileService = async (req, res) => {
    const owner = req.loginUser
    const updatedData = req.body;

    const allowedUpdates = ['brandName', 'brandType', 'address', 'city', 'country', 'phone']
    allowedUpdates.forEach(element => {
        if (updatedData[element]) owner[element] = updatedData[element]
    });

    const brandProfile = {
        brandName: owner.brandName,
        brandType: owner.brandType,
        address: owner.address,
        city: owner.city,
        country: owner.country,
        phone: owner.phone,
        isVerified: owner.isVerified
    }
    await owner.save()

    res.status(200).json({ message: 'profile updated successfully', brandProfile })
}

// change password services
export const changeBrandPasswordService = async (req, res) => {
    const owner = req.loginUser
    const { oldPassword, confirmPassword, newPassword } = req.body;

    const isPasswordMatch = await comparing(oldPassword, owner.password)
    if (!isPasswordMatch) return res.status(409).json({ message: 'password not matched' })

    owner.password = newPassword
    await owner.save()

    res.status(200).json({ message: 'password changed successfully' })
}

// verify brand profile
export const verifyBrandProfileService = async (req, res) => {
    const owner = req.loginUser;
    const { isVerified } = owner
    const { taxID, companyRegistrationNumber } = req.body;

    if (isVerified) return res.status(409).json({
        message: 'brand already verified'
    });

    owner.taxID = taxID;
    owner.companyRegistrationNumber = companyRegistrationNumber;
    owner.taxStatus = legalStatus.SUBMITTED
    owner.registrationStatus = legalStatus.SUBMITTED

    await owner.save()

    res.status(200).json({ message: 'The data has been submitted successfully. We will review it and respond to you.' })
}

