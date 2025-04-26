const orderInvoiceEmail = (order) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order ${order.orderStatus} - Click Shop</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; margin: 0; padding: 10px;">
  <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 6px; box-shadow: 0 0 6px rgba(0,0,0,0.08);">
    <h2 style="color: #333; font-size: 20px;">Hello ${order.customerName},</h2>
    <p style="font-size: 14px;">We're happy to inform you that your order has been <strong>${order.orderStatus}</strong>!</p>

    <h3 style="margin-top: 16px; border-bottom: 1px solid #ddd; padding-bottom: 4px; font-size: 16px;">Order Summary</h3>
    <p style="font-size: 14px;"><strong>Order ID:</strong> ${order._id.toString()}</p>
    <p style="font-size: 14px;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
    <p style="font-size: 14px;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    <p style="font-size: 14px;"><strong>Payment Status:</strong> ${order.paymentStatus}</p>

    <h3 style="margin-top: 16px; font-size: 16px;">Products</h3>
    <table width="100%" style="border-collapse: collapse; margin-top: 8px; font-size: 14px;">
      <thead>
        <tr style="background-color: #f2f2f2; color: #333; text-align: left;">
          <th style="padding: 8px; border-bottom: 2px solid #ddd;">Product</th>
          <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: center;">Qty</th>
          <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: right;">Price (EGP)</th>
        </tr>
      </thead>
      <tbody>
        ${order.products.map(product => `
          <tr style="border-bottom: 1px solid #f9f9f9;">
            <td style="padding: 8px; border-bottom: 1px solid #f9f9f9;">${product.name}</td>
            <td style="padding: 8px; text-align: center; border-bottom: 1px solid #f9f9f9;">${product.quantity}</td>
            <td style="padding: 8px; text-align: right; border-bottom: 1px solid #f9f9f9;">EGP ${product.price}</td>
          </tr>
        `).join('')}
      </tbody>
      <tfoot>
        <tr style="font-size: 15px; background-color: #f9f9f9;">
          <td colspan="2" style="padding: 8px; font-weight: bold; text-align: left;">Subtotal</td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">EGP ${order.subtotalPrice}</td>
        </tr>
        <tr style="font-size: 15px;">
          <td colspan="2" style="padding: 8px; font-weight: bold; text-align: left;">Shipping Fee</td>
          <td style="padding: 8px; text-align: right;">EGP ${order.shippingFee}</td>
        </tr>
        <tr style="font-size: 15px; background-color: #f9f9f9;">
          <td colspan="2" style="padding: 8px; font-weight: bold; text-align: left;">Discount (${order.discountPercentage}%)</td>
          <td style="padding: 8px; text-align: right;">EGP ${order.discountAmount}</td>
        </tr>
        <tr style="font-size: 15px; background-color: #f2f2f2; color: #333;">
          <td colspan="2" style="padding: 8px; font-weight: bold; text-align: left;">Total</td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">EGP ${order.totalPrice}</td>
        </tr>
      </tfoot>
    </table>

    <h3 style="margin-top: 16px; font-size: 16px;">Shipping Address</h3>
    <p style="font-size: 14px;">
      ${order.address.street},<br>
      ${order.address.city}, ${order.address.country}
    </p>

    <p style="margin-top: 16px; font-size: 14px;">Thank you for shopping with <strong>Click Shop</strong>!</p>

    <p style="margin-top: 24px; font-size: 14px;">Best regards,<br/>Click Shop Team</p>
  </div>
</body>
</html>
`;

export default orderInvoiceEmail;
