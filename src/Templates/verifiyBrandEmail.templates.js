const brandOwnerWelcomeEmail = (BrandName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome Email</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #000; padding: 20px; line-height: 1.6; background-color: #ffffff;">

  <p>Dear ${BrandName || 'Brand Owner'},</p>

  <p>Welcome to Click Shop. We're glad to have you on board as a <strong>Brand Owner</strong>.</p>

  <p>To complete your brand verification, please provide the following information:</p>

  <ul>
    <li><strong>Commercial Registration Number</strong></li>
    <li><strong>Tax Identification Number</strong></li>
  </ul>

  <p>This information is required to verify your business and activate your profile on our platform.</p>

  <p>You can log in to your dashboard and complete these fields at your earliest convenience:</p>

  <p>
    Dashboard link: <a href="https://yourapp.com/brand-dashboard" target="_blank">https://yourapp.com/brand-dashboard</a>
  </p>

  <p>If you have any questions or need assistance, feel free to reply to this email.</p>

  <p>Best regards,<br>
  Click Shop Team</p>

</body>
</html>
`;

export default brandOwnerWelcomeEmail;
