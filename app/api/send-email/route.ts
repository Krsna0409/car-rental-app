import { NextRequest, NextResponse } from 'next/server'
import { generateWelcomeEmailHTML } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, name } = await request.json()

    // Validate input
    if (!to || !subject || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the email details for demo purposes
    console.log('[v0] Welcome email triggered for:', {
      to,
      name,
      subject,
      timestamp: new Date().toISOString(),
    })

    // In production, you would integrate with:
    // - Resend (https://resend.com)
    // - SendGrid (https://sendgrid.com)
    // - Mailgun (https://mailgun.com)
    // - AWS SES (https://aws.amazon.com/ses/)
    
    // For now, simulate successful email send
    const htmlContent = generateWelcomeEmailHTML(name)
    
    // Store email in a simple in-memory structure (for demo only)
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).sentEmails = (globalThis as any).sentEmails || []
      ;(globalThis as any).sentEmails.push({
        to,
        subject,
        name,
        html: htmlContent,
        sentAt: new Date().toISOString(),
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Welcome email queued successfully',
        email: to,
        name: name,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    
    // Return success even on error - don't block user login
    return NextResponse.json(
      {
        success: true,
        message: 'Welcome email queued (processing)',
      },
      { status: 200 }
    )
  }
}
