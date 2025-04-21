import mongoose from "mongoose";
import { roles } from "../../Constants/constants.js";
import { hashing } from "../../Utils/crypto.utils.js";

const adminDatabaseSchema = new mongoose.Schema({
    email: {
        type: String,
        reauired: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.ADMIN
    },
    isActive: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    loginTime: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
})

adminDatabaseSchema.pre('save', async function () {
    if (this.isModified('password')) this.password = hashing(this.password, +process.env.SALT)
})

const AdminModel = mongoose.models.admins || mongoose.model('admins', adminDatabaseSchema)

export default AdminModel