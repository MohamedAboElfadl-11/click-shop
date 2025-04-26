import { orderStatus } from "../../../Constants/constants.js"
import CustomerModel from "../../../Database/Models/customer.model.js"
import OrderModel from "../../../Database/Models/order.model.js"
import { emitter } from "../../../Services/sendEmail.service.js"
import orderInvoiceEmail from "../../../Templates/acceptOrder.template.js"
import orderRejectedEmail from "../../../Templates/rejectOrder.template.js"

export const manageOrderService = async (req, res) => {

    const { orderID } = req.params

    const order = await OrderModel.findById(orderID)

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const customer = await CustomerModel.findById(order.customerID)

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const customerEmail = customer.email

    if (!order) return res.status(404).json({ message: 'Order not found' })

    if (req.body.orderStatus === orderStatus.CONFIRMED) {

        order.orderStatus = orderStatus.CONFIRMED

        await order.save()

        emitter.emit('sendEmail', {
            subject: "Order from click shop",
            to: customerEmail,
            html: orderInvoiceEmail(order)
        })
    } else if (req.body.orderStatus === orderStatus.CANCELLED) {

        order.orderStatus = orderStatus.CANCELLED

        await order.save()

        emitter.emit('sendEmail', {
            subject: "Order from click shop",
            to: customerEmail,
            html: orderRejectedEmail(order)
        })
    } else {
        return res.status(400).json({ message: "Invalid order status" });
    }

    res.status(200).json({
        message: `Order ${order.orderStatus.toLowerCase()} and email sent successfully`
    });
}
