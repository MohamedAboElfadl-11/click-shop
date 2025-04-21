import mongoose from "mongoose";
import * as constants from "../../Constants/constants.js";
import { decryption, encryption, hashing } from "../../Utils/crypto.utils.js";

const customerDatabaseSchema = new mongoose.Schema({
    email: { // using in login
        type: String,
        unique: true,
        required: true,
        index: true,
        lowercase: true
    },
    username: { // using in login
        type: String,
        unique: true,
        required: true,
        index: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: String,
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(constants.gender),
        default: constants.gender.NON
    },
    role: {
        type: String,
        enum: Object.values(constants.roles),
        default: constants.roles.CUSTOMER
    },
    provider: {
        type: String,
        enum: Object.values(constants.providers),
        default: constants.providers.SYSTEM
    },
    userOtps: [{
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
    isAccountConfirmed: {
        type: Boolean,
        default: false
    },
    profilePic: {
        secure_url: String,
        public_id: String
    },
    changeCredentialTime: Date,
    deletedAt: Date,
    bannedAt: Date, // admin
    DOB: Date,
    bio: String,
}, {
    timestamps: true
});

customerDatabaseSchema.pre('save', async function () {
    if (this.isModified('phone')) this.phone = encryption(this.phone, process.env.SECRET_KEY)
    if (this.isModified('password')) this.password = hashing(this.password, +process.env.SALT)
})

customerDatabaseSchema.post('findOne', async function (doc) {
    if (doc) {
        doc.phone = decryption(doc.phone, process.env.SECRET_KEY);
    }
})

const CustomerModel = mongoose.models.customers || mongoose.model('customers', customerDatabaseSchema);
export default CustomerModel