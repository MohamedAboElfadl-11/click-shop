const brandRejectedEmail = (brandName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Brand Rejected - Click Shop</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #000; padding: 20px; background-color: #fff;">
  <p>Dear ${brandName || 'Brand Owner'},</p>

  <p>We regret to inform you that your brand has not been approved for listing on Click Shop at this time.</p>

  <p>Please review the provided information and make sure that your <strong>Commercial Registration Number</strong> and <strong>Tax Identification Number</strong> are accurate and valid.</p>

  <p>If you believe this was a mistake or have any questions, feel free to reply to this email or contact our support team.</p>

  <p>Best regards,<br>
  Click Shop Team</p>
</body>
</html>
`;

export default brandRejectedEmail;
