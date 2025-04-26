import FavoriteModel from "../../../Database/Models/favoritae.model.js";
import ProductModel from "../../../Database/Models/product.model.js";

export const addToFavoriteService = async (req, res) => {
    const { _id } = req.loginUser;
    const { productID } = req.params;

    const product = await ProductModel.findById(productID);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    let favoriteList = await FavoriteModel.findOne({ customerID: _id });

    if (!favoriteList) {
        favoriteList = new FavoriteModel({
            customerID: _id,
            products: [productID]
        });
    } else {
        if (favoriteList.products.includes(productID)) {
            return res.status(400).json({ message: 'Product already in favorite list' });
        }
        favoriteList.products.push(productID);
    }

    await favoriteList.save();

    res.status(200).json({ message: 'Product added to favorite list successfully', favoriteList });
};

// get favorite list 
export const listFavoriteService = async (req, res, next) => {
    const { _id } = req.loginUser;

    const favoriteList = await FavoriteModel.findOne({ customerID: _id })
        .populate({
            path: 'products',
            select: 'name price brand image'
        });

    if (!favoriteList || favoriteList.products.length === 0) {
        return res.status(404).json({ message: 'No favorite products found' });
    }

    res.status(200).json({ favoriteProducts: favoriteList.products });
};

// remove product from favorite list
export const removeFromFavoriteService = async (req, res, next) => {
    const { _id } = req.loginUser;
    const { productID } = req.params;

    const favoriteList = await FavoriteModel.findOne({ customerID: _id });

    if (!favoriteList) {
        return res.status(404).json({ message: 'Favorite list not found' });
    }

    const productIndex = favoriteList.products.indexOf(productID);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in favorite list' });
    }

    favoriteList.products.splice(productIndex, 1);

    await favoriteList.save();

    res.status(200).json({ message: 'Product removed from favorite list successfully' });
};
