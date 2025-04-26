import { paymentMethod, paymentStatus } from "../../../Constants/constants.js";
import CartModel from "../../../Database/Models/cart.model.js";
import OrderModel from "../../../Database/Models/order.model.js";
import { payWithCardDirectly } from "../../../Services/strip.service.js";


export const createOrderService = async (req, res) => {
    const { paymentType, card } = req.body;
    const customer = req.loginUser;
    const address = req.address;

    if (!paymentType || !Object.values(paymentMethod).includes(paymentType)) {
        return res.status(400).json({ message: 'Invalid or missing payment method' });
    }

    const cart = await CartModel.findOne({ customerID: customer._id });
    if (!cart) {
        return res.status(404).json({ message: 'No cart found, start shopping!' });
    }

    const orderSubtotal = cart.totalPrice;
    const shippingFee = 30;
    const discountPercentage = 5;
    const discountAmount = (orderSubtotal * discountPercentage) / 100;
    const finalTotal = orderSubtotal + shippingFee - discountAmount;

    // If online payment, handle payment
    if (paymentType === paymentMethod.ONLINE) {
        if (!card) {
            return res.status(400).json({ message: 'Missing payment information for online payment' });
        }

        const paymentResult = await payWithCardDirectly(finalTotal, card);

        if (!paymentResult || paymentResult.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment failed', paymentResult });
        }
    }

    // Build the order data
    const orderData = {
        customerID: customer._id,
        customerName: `${customer.firstName} ${customer.lastName}`,
        customerPhone: customer.phone,
        products: cart.products,
        discountAmount,
        shippingFee,
        discountPercentage,
        subtotalPrice: orderSubtotal,
        totalPrice: finalTotal,
        paymentMethod: paymentType,
        address: {
            addressID: address._id,
            street: address.street,
            city: address.city,
            country: address.country
        },
        paymentStatus: paymentType === paymentMethod.ONLINE ? paymentStatus.PAID : paymentStatus.UNPAID
    };

    // Clear the cart and create the order
    await CartModel.deleteOne({ customerID: customer._id });
    const createdOrder = await OrderModel.create(orderData);

    res.status(201).json({ message: 'Order created successfully', order: createdOrder });
};


export const getOrdersService = async (req, res) => {

    const { _id } = req.loginUser

    const orders = await OrderModel.find({ customerID: _id })

    if (!orders) return res.status(404).json({ message: 'No orders yet, Start shopping' })

    res.status(200).json({ orders })
}

// checkout service
