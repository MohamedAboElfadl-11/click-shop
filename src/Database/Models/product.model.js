import mongoose from "mongoose";

const productDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [{
        secure_url: String,
        public_id: String
    }],
    slug: {
        type: String,
        unique: true
    },

    brand: String,

}, {
    timestamps: true
});

const ProductModel = mongoose.models.products || mongoose.model('products', productDatabaseSchema)
export default ProductModel