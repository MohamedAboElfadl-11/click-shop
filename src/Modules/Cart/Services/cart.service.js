import CartModel from "../../../Database/Models/cart.model.js";
import ProductModel from "../../../Database/Models/product.model.js";

// Add to cart service create a new one and add more products
export const addToCartService = async (req, res) => {

    const { _id } = req.loginUser;

    const { productID, quantity } = req.body;

    let cart = await CartModel.findOne({ customerID: _id })

    const product = await ProductModel.findById(productID);

    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }

    if (!cart) {
        cart = new CartModel({
            customerID: _id,
            products:
            {
                productID,
                name: product.slug,
                price: product.price,
                quantity: quantity || 1
            },
            totalPrice: product.price * (quantity || 1)
        })
        await cart.save()
    } else {
        const existingProductIndex = cart.products.findIndex(
            p => p.productID.toString() === productID
        );
        console.log(existingProductIndex)
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += (quantity || 1);
        } else {
            cart.products.push({
                productID,
                name: product.slug,
                price: product.price,
                quantity: quantity || 1
            });
        }
        let totalPrice = 0;
        for (let item of cart.products) {
            totalPrice += item.price * item.quantity;
        }
        cart.totalPrice = totalPrice;

        await cart.save();
    }

    res.status(200).json({ message: "Product added to cart successfully", cart })
}

// remove product or reduce quantity
export const removeFromCartService = async (req, res) => {

    const { _id } = req.loginUser;

    const { productID, quantity } = req.body

    const cart = await CartModel.findOne({ customerID: _id })

    if (!cart) return res.status(404).json({ message: 'No cart yet, start shoping' })

    const product = await ProductModel.findById(productID);

    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }

    const existingProductIndex = cart.products.findIndex(
        p => p.productID.toString() === productID
    );

    if (existingProductIndex == -1) {
        return res.status(404).json({ message: 'product not in cart' })
    } else {

        cart.products[existingProductIndex].quantity -= quantity

        if (cart.products[existingProductIndex].quantity <= 0) {
            cart.products.splice(existingProductIndex, 1);
        }
    }

    let totalPrice = 0;

    for (let item of cart.products) {
        totalPrice += item.price * item.quantity;
    }

    cart.totalPrice = totalPrice;

    await cart.save()

    res.status(200).json({ cart })
}

// get cart 
export const getCartService = async (req, res) => {

    const { _id } = req.loginUser;

    const cart = await CartModel.findOne({ customerID: _id })

    if (!cart) return res.status(404).json({ message: 'No cart yet, start shoping' })
    
    const cartSummary = cart.products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        total: product.price * product.quantity,
    }));

    res.status(200).json({
        cartSummary,
        totalPrice: cart.totalPrice
    });
}

// Delete cart
export const deleteCartService = async (req, res) => {

    const { _id } = req.loginUser;

    const cart = await CartModel.findOneAndDelete({ customerID: _id })

    if (!cart) return res.status(404).json({ message: 'No cart yet' })
    
    res.status(200).json({ message: 'Cart deleted successfully' })
}