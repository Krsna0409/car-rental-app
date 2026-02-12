export function generateWelcomeEmailHTML(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1a3a52; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .content { background-color: #f9fafb; padding: 30px; }
          .button { display: inline-block; background-color: #1a3a52; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin-top: 20px; font-weight: bold; }
          .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Drive With Vibes</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for joining us! We're thrilled to have you as part of the Drive With Vibes community.</p>
            <p>You now have access to our premium car rental services with:</p>
            <ul>
              <li>Affordable pricing on luxury vehicles</li>
              <li>Easy online booking</li>
              <li>24/7 customer support</li>
              <li>Flexible rental plans</li>
            </ul>
            <p>Ready to start your journey? Log in to your account and browse our collection of vehicles.</p>
            <a href="https://drive-with-vibes.com" class="button">Explore Our Fleet</a>
            <p style="margin-top: 30px; color: #666; font-size: 14px;">If you have any questions, feel free to contact our support team at support@drivewithvibes.com</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Drive With Vibes. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        name: name,
        subject: 'Welcome to Drive With Vibes!',
      }),
    })

    if (!response.ok) {
      console.error('Email API error:', response.statusText)
      // Don't throw, just log - email should not block login
      return
    }

    const data = await response.json()
    console.log('Email sent:', data)
  } catch (error) {
    console.error('Email sending error:', error)
    // Don't throw, just log - email should not block login
  }
}
