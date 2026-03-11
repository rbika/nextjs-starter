import { resend } from '@/lib/resend'

const sendResetPasswordEmail = async (
  toName: string,
  toEmail: string,
  resetPasswordUrl: string,
) => {
  return await resend.emails.send({
    from: 'onboarding@resend.dev', // TODO: Change to your custom domain
    to: toEmail,
    subject: 'Reset your password',
    html: `Hello ${toName}. Click the link below to reset your password.<br/><a href="${resetPasswordUrl}">Reset Password</a>`,
  })
}

export { sendResetPasswordEmail }
