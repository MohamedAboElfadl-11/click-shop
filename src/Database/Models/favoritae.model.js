import mongoose from 'mongoose';

const favoriteDatabaseSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products' 
        }
    ]
}, {
    timestamps: true 
});

const FavoriteModel = mongoose.models.favorites || mongoose.model('favorites', favoriteDatabaseSchema);

export default FavoriteModel