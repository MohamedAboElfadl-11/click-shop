import { brandStatus, legalStatus } from "../../../../Constants/constants.js";
import BrandOwnerModel from "../../../../Database/Models/brand-owner.model.js";
import { emitter } from "../../../../Services/sendEmail.service.js";
import brandRejectedEmail from "../../../../Templates/rejectBrandEmail.teplate.js";
import brandVerifiedEmail from "../../../../Templates/verifiyBrandEmail.template.js";

// accept brand
export const verifyBrandService = async (req, res) => {

    const { brandID } = req.params;
    const brand = await BrandOwnerModel.findById(brandID)
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    if (brand.isVerified) return res.status(409).json({ message: "brand already verified" })

    brand.isVerified = true
    brand.registrationStatus = legalStatus.VERIFUED
    brand.taxStatus = legalStatus.VERIFUED
    brand.status = brandStatus.ACTIVE

    await brand.save()

    emitter.emit('sendEmail', {
        subject: "Verification Brand",
        to: brand.email,
        html: brandVerifiedEmail(brand.brandName)
    })

    res.status(200).json({ message: "brand activated successfully" })
}

// reject brand
export const rejectBrandService = async (req, res) => {
    const { brandID } = req.params;
    const brand = await BrandOwnerModel.findById(brandID);

    if (!brand) return res.status(404).json({ message: "Brand not found" });

    if (brand.status === brandStatus.SUSPENDED)
        return res.status(409).json({ message: "Brand already rejected" });

    brand.isVerified = false;
    brand.registrationStatus = legalStatus.REJECTED;
    brand.taxStatus = legalStatus.REJECTED;
    brand.status = brandStatus.SUSPENDED;

    await brand.save();

    emitter.emit('sendEmail', {
        subject: "Brand Rejected",
        to: brand.email,
        html: brandRejectedEmail(brand.brandName)
    });

    res.status(200).json({ message: "Brand rejected successfully" });
};
