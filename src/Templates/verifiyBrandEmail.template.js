const brandVerifiedEmail = (brandName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Brand Verified - Click Shop</title>
</head>
<body style="font-family: Arial, sans-serif; color: #000; font-size: 14px; line-height: 1.6; padding: 20px;">
  <p>Dear ${brandName || 'Brand Owner'},</p>

  <p>We are pleased to inform you that your brand "<strong>${brandName}</strong>" has been successfully verified and accepted on Click Shop.</p>

  <p>You can now proceed to list your products and manage your brand through your dashboard.</p>

  <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>

  <p>Best regards,<br>
  Click Shop Team</p>
</body>
</html>
`;

export default brandVerifiedEmail;
