const orderRejectedEmail = (order) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Rejected - Click Shop</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; background-color: #fef2f2; margin: 0; padding: 16px;">
  <div style="max-width: 600px; margin: auto; background: #fff; padding: 24px; border-radius: 6px; border: 1px solid #fca5a5;">
    <h2 style="color: #dc2626;">Hello ${order.customerName},</h2>
    <p>We regret to inform you that your recent order has been <strong style="color: #dc2626;">rejected</strong>.</p>
    <p>If you believe this was a mistake or have any questions, feel free to contact our support team.</p>

    <h3 style="margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Order Summary</h3>
    <p><strong>Order ID:</strong> ${order._id.toString()}</p>
    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>

    <h3 style="margin-top: 16px; font-size: 16px;">Products</h3>
    <table width="100%" style="border-collapse: collapse; margin-top: 8px;">
      <thead>
        <tr style="background-color: #fef2f2; font-size: 14px;">
          <th align="left" style="padding: 6px; border-bottom: 1px solid #ddd;">Product</th>
          <th align="center" style="padding: 6px; border-bottom: 1px solid #ddd;">Qty</th>
          <th align="right" style="padding: 6px; border-bottom: 1px solid #ddd;">Price (EGP)</th>
        </tr>
      </thead>
      <tbody>
        ${order.products.map(product => `
          <tr style="font-size: 14px;">
            <td style="padding: 6px; border-bottom: 1px solid #eee;">${product.name}</td>
            <td align="center" style="padding: 6px; border-bottom: 1px solid #eee;">${product.quantity}</td>
            <td align="right" style="padding: 6px; border-bottom: 1px solid #eee;">${product.price.toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <p style="text-align: right; font-size: 16px; margin-top: 10px;">
      <strong>Total:</strong> EGP ${order.totalPrice.toLocaleString()}
    </p>

    <h3 style="margin-top: 20px;">Shipping Address</h3>
    <p>
      ${order.address.street},<br>
      ${order.address.city}, ${order.address.country}
    </p>

    <p style="margin-top: 24px;">We sincerely apologize for the inconvenience, and we hope to serve you again in the future.</p>

    <p style="margin-top: 28px;">Best regards,<br/>Click Shop Team</p>
  </div>
</body>
</html>
`;

export default orderRejectedEmail;
