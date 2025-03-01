import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "myatkyawthu4002@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Message</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #374151;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 2rem;
                background-color: #ffffff;
              }
              .header {
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 1.5rem;
                margin-bottom: 2rem;
              }
              .title {
                font-size: 1.5rem;
                font-weight: 600;
                color: #111827;
                margin: 0;
              }
              .subtitle {
                font-size: 0.875rem;
                color: #6b7280;
                margin-top: 0.5rem;
              }
              .content {
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 0.5rem;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
              }
              .field {
                margin-bottom: 1.25rem;
              }
              .field:last-child {
                margin-bottom: 0;
              }
              .label {
                font-size: 0.875rem;
                font-weight: 500;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.025em;
                margin-bottom: 0.5rem;
              }
              .value {
                color: #111827;
                font-size: 1rem;
              }
              .footer {
                font-size: 0.875rem;
                color: #6b7280;
                text-align: center;
                padding-top: 1.5rem;
                border-top: 1px solid #e5e7eb;
              }
              .message-content {
                white-space: pre-line;
                line-height: 1.75;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">New Message Received</h1>
                <p class="subtitle">A new contact form submission has arrived</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name} (${email})</div>
                </div>
                
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>
                
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value message-content">${message}</div>
                </div>
              </div>
              
              <div class="footer">
                This email was sent from your portfolio contact form
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch  {
    return NextResponse.json({ success: false, error: "Failed to send email" })
  }
}