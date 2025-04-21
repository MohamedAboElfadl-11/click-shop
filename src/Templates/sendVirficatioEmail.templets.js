const emailTemplate = (firstName, otp, condition) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${condition} - Click Shop</title>
</head>
<body style="font-family: Arial, sans-serif; color: #000; font-size: 14px; line-height: 1.6; margin: 0; padding: 20px;">
    <p>Dear ${firstName},</p>
    <p>We are sending you this email regarding your request to <strong>${condition}</strong>.</p>
    <p>Please use the OTP below to proceed:</p>
    <div style="font-size: 20px; font-weight: bold; padding: 8px; border: 1px solid #ccc; display: inline-block; background-color: #f7f7f7; margin-top: 10px;">
        ${otp}
    </div>
    <p style="margin-top: 10px;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best regards,</p>
    <p>Click Shop Team</p>
</body>
</html>
`;

export default emailTemplate;
