import mongoose from "mongoose";

const cartDatabaseSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true,
    },
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
    }
},
    {
        timestamps: true
    }
);

const CartModel = mongoose.models.carts || mongoose.model('carts', cartDatabaseSchema);

export default CartModel;
