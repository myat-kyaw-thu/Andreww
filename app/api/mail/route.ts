import { Resend } from "resend"

// Lazy initialize Resend to avoid errors during build
let resend: Resend | null = null

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set")
    }
    resend = new Resend(apiKey)
  }
  return resend
}

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getClientIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per minute)
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
    return true
  }

  if (limit.count >= 5) {
    return false // Rate limit exceeded
  }

  limit.count++
  return true
}

export async function POST(request: Request) {
  try {
    const { name, email, message, website } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Honeypot check - if website field is filled, it's likely a bot
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered - spam detected")
      // Return success to fool bots, but don't send email
      return Response.json({ success: true })
    }

    // Rate limiting check
    const clientIP = getClientIP(request)
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Check for spam keywords
    const spamKeywords = ["viagra", "casino", "lottery", "click here", "buy now"]
    const messageText = `${name} ${message}`.toLowerCase()
    if (spamKeywords.some((keyword) => messageText.includes(keyword))) {
      console.log("Spam keywords detected")
      return Response.json({ success: true }) // Fool bots
    }

    // Get Resend instance
    const resendClient = getResend()

    // Send confirmation email to user
    const userEmailResponse = await resendClient.emails.send({
      from: "noreply@myatkyawthu.com",
      to: email,
      subject: "Thank you for reaching out",
      html: generateUserEmail(name, message, email),
    })

    if (userEmailResponse.error) {
      console.error("User email failed:", userEmailResponse.error)
      return Response.json(
        { success: false, error: "Failed to send confirmation email" },
        { status: 500 }
      )
    }

    // Send notification email to admin
    const adminEmailResponse = await resendClient.emails.send({
      from: "noreply@myatkyawthu.com",
      to: "myatkyawthu4002@gmail.com",
      subject: `New message from ${name}`,
      html: generateAdminEmail(name, email, message),
    })

    if (adminEmailResponse.error) {
      console.error("Admin email failed:", adminEmailResponse.error)
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return Response.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}

function generateUserEmail(name: string, message: string, email: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f5f5f5; color: #1a1a1a; padding: 20px; }
          .container { max-width: 500px; margin: 0 auto; }
          .card { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
          .header-card { background: #000; color: #fff; padding: 40px 30px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
          .header-card h1 { font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
          .content { padding: 30px; }
          .greeting { font-size: 15px; line-height: 1.6; color: #333; margin-bottom: 24px; }
          .message-section { margin-bottom: 24px; }
          .message-label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: #999; text-transform: uppercase; margin-bottom: 10px; }
          .message-box { background: #f9f9f9; padding: 16px; border-radius: 6px; border-left: 3px solid #000; font-size: 14px; line-height: 1.6; color: #555; white-space: pre-wrap; word-break: break-word; }
          .signature { font-size: 14px; line-height: 1.6; color: #333; margin-top: 24px; }
          .signature strong { font-weight: 600; }
          .footer-card { background: #f9f9f9; padding: 20px 30px; text-align: center; border-radius: 8px; }
          .footer-card p { font-size: 12px; color: #999; margin-bottom: 6px; }
          .footer-card a { color: #666; text-decoration: none; }
          .footer-card a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-card">
            <h1>Thank you</h1>
          </div>
          
          <div class="card">
            <div class="content">
              <p class="greeting">Hi ${name}, ${email}</p>
              <p class="greeting">I received your message and appreciate you reaching out. I'll review your project details and get back to you as soon as possible.</p>
              
              <div class="message-section">
                <div class="message-label">Your message</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div class="signature">
                Best regards,<br><strong>Myat Kyaw Thu</strong>
              </div>
            </div>
          </div>
          
          <div class="footer-card">
            <p>© 2026 Myat Kyaw Thu. All rights reserved.</p>
            <p><a href="https://myatkyawthu.com">myatkyawthu.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateAdminEmail(name: string, email: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f5f5f5; color: #1a1a1a; padding: 20px; }
          .container { max-width: 500px; margin: 0 auto; }
          .card { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .header-card { background: #000; color: #fff; padding: 40px 30px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
          .header-card h1 { font-size: 22px; font-weight: 600; letter-spacing: -0.5px; }
          .content { padding: 30px; }
          .from-section { margin-bottom: 24px; }
          .from-label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: #999; text-transform: uppercase; margin-bottom: 8px; }
          .from-name { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
          .from-email { font-size: 14px; color: #666; }
          .message-section { margin-bottom: 24px; }
          .message-label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: #999; text-transform: uppercase; margin-bottom: 10px; }
          .message-box { background: #f9f9f9; padding: 16px; border-radius: 6px; border-left: 3px solid #000; font-size: 14px; line-height: 1.6; color: #555; white-space: pre-wrap; word-break: break-word; }
          .action { margin-top: 24px; }
          .action a { display: inline-block; background: #000; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 4px; }
          .action a:hover { background: #333; }
          .footer-card { background: #f9f9f9; padding: 20px 30px; text-align: center; border-radius: 8px; margin-top: 20px; }
          .footer-card p { font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-card">
            <h1>New message</h1>
          </div>
          
          <div class="card">
            <div class="content">
              <div class="from-section">
                <div class="from-label">From</div>
                <div class="from-name">${name}</div>
                <div class="from-email">${email}</div>
              </div>
              
              <div class="message-section">
                <div class="message-label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div class="action">
                <a href="mailto:${email}">Reply to ${name}</a>
              </div>
            </div>
          </div>
          
          <div class="footer-card">
            <p>© 2026 Myat Kyaw Thu</p>
          </div>
        </div>
      </body>
    </html>
  `
}
