const brandOwnerWelcomeEmail = (BrandName) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Welcome Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 30px; text-align: left;">
              <h2 style="color: #333333;">Welcome ${BrandName || 'Brand Owner'} 👋</h2>
              
              <p style="font-size: 16px; color: #555555;">
                We're excited to have you on board as a <strong>Brand Owner</strong>! 🎉
              </p>

              <p style="font-size: 16px; color: #555555;">
                To complete your brand verification, we kindly ask you to provide your:
              </p>
              
              <ul style="font-size: 16px; color: #555555; padding-left: 20px;">
                <li><strong>Commercial Registration Number</strong></li>
                <li><strong>Tax Identification Number</strong></li>
              </ul>

              <p style="font-size: 16px; color: #555555;">
                This information is required to verify your business and activate your profile on our platform.
              </p>

              <p style="font-size: 16px; color: #555555;">
                Please log in to your dashboard and complete these fields as soon as possible.
              </p>

              <div style="margin: 30px 0;">
                <a href="https://yourapp.com/brand-dashboard" target="_blank" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Go to Dashboard
                </a>
              </div>

              <p style="font-size: 14px; color: #999999;">
                If you have any questions or need help, feel free to reply to this email.
              </p>

              <p style="font-size: 14px; color: #999999;">
                Best regards,<br/>
                <strong>Click Shop Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
`
export default brandOwnerWelcomeEmail
