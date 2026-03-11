import { resend } from '@/lib/resend'

const sendVerificationEmail = async (
  toName: string,
  toEmail: string,
  verificationUrl: string,
) => {
  return await resend.emails.send({
    from: 'onboarding@resend.dev', // TODO: Change to your custom domain
    to: toEmail,
    subject: 'Verify your email address',
    html: `Hello ${toName}. Click the link below to verify your email address.<br/><a href="${verificationUrl}">Verify Email</a>`,
  })
}

export { sendVerificationEmail }
