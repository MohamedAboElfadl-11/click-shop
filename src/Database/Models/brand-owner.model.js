import mongoose from "mongoose";
import * as constants from "../../Constants/constants.js";
import { decryption, encryption, hashing } from "../../Utils/crypto.utils.js";

const brandOwnerDatabaseSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    brandType: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    companyRegistrationNumber: String,
    registrationStatus: {
        type: String,
        enum: Object.values(constants.legalStatus),
        default: constants.legalStatus.Not_PROVIDED
    },
    taxID: String,
    taxStatus: {
        type: String,
        enum: Object.values(constants.legalStatus),
        default: constants.legalStatus.Not_PROVIDED
    },
    brandOtps: [{
        code: {
            type: String,
        },
        codeType: {
            type: String,
            enum: Object.values(constants.otpCodeType)
        },
        expDate: {
            type: Date,
        }
    }],
    isEmailConfirmed: {
        type: Boolean,
        default: false
    },
    profileImage: {
        secure_url: String,
        public_id: String
    },
    agreedToTerms: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: Object.values(constants.brandStatus),
        default: constants.brandStatus.PENDING
    },
    role: {
        type: String,
        enum: Object.values(constants.roles),
        default: constants.roles.BRAND_OWNER
    }
}, {
    timestamps: true
});

brandOwnerDatabaseSchema.pre('save', async function () {
    if (this.isModified('phone')) this.phone = encryption(this.phone, process.env.SECRET_KEY)
    if (this.isModified('password')) this.password = hashing(this.password, +process.env.SALT)
})

brandOwnerDatabaseSchema.post('findOne', async function (doc) {
    if (doc) {
        doc.phone = decryption(doc.phone, process.env.SECRET_KEY);
    }
})

const BrandOwnerModel = mongoose.models.brandowners || mongoose.model('brandowners', brandOwnerDatabaseSchema);

export default BrandOwnerModel