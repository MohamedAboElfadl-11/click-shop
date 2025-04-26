import CartModel from "../../../Database/Models/cart.model.js";
import OrderModel from "../../../Database/Models/order.model.js";

export const createOrderService = async (req, res) => {

    const customer = req.loginUser;

    const address = req.address

    const customerName = `${customer.firstName} ${customer.lastName}`

    const cart = await CartModel.findOne({ customerID: customer._id })

    if (!cart) return res.status(404).json({ message: 'No cart founded, Start shopping' })

    const orderProducts = cart.products

    const orderSubtotal = cart.totalPrice;

    const shippingFee = req.body.shippingFee || 0;

    const discountPercentage = req.body.discount || 0;

    const discountAmount = (orderSubtotal * discountPercentage) / 100;

    const finalTotal = orderSubtotal + shippingFee - discountAmount;

    const order = {
        customerID: customer._id,
        customerName,
        customerPhone: customer.phone,
        products: orderProducts,
        discountAmount,
        shippingFee,
        discountPercentage,
        subtotalPrice: orderSubtotal,
        totalPrice: finalTotal,
        paymentMethod: req.body.paymentMethod,
        address: {
            addressID: address._id,
            street: address.street,
            city: address.city,
            country: address.country
        }
    }
    
    await CartModel.deleteOne({ customerID: customer._id })

    const createdOrder = await OrderModel.create(order);

    res.status(201).json({ message: 'Order created successfully', order: createdOrder });
}

// get customer orders
export const getOrdersService = async (req, res) => {

    const { _id } = req.loginUser

    const orders = await OrderModel.find({ customerID: _id })

    if (!orders) return res.status(404).json({ message: 'No orders yet, Start shopping' })

    res.status(200).json({ orders })
}