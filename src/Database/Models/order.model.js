import mongoose from "mongoose";
import * as constants from "../../Constants/constants.js";

const orderDatabaseSchema = new mongoose.Schema({

    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true,
    },

    customerName: String,
    
    customerPhone: String,
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: Object.values(constants.orderStatus),
        default: constants.orderStatus.PENDING
    },
    paymentMethod: {
        type: String,
        enum: Object.values(constants.paymentMethod),
        required: true
    },
    paymentStatus: {
        type: String,
        enum: Object.values(constants.paymentStatus),
        default: constants.paymentStatus.UNPAID
    },
    address: {
        addressID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addresses',
            required: true
        },
        street: String,
        city: String,
        country: String
    }
}, {
    timestamps: true
})

orderDatabaseSchema.pre('save', async function () {
    if (this.isModified('phone')) this.phone = encryption(this.phone, process.env.SECRET_KEY)
})

const OrderModel = mongoose.models.orders || mongoose.model('orders', orderDatabaseSchema);

export default OrderModel;