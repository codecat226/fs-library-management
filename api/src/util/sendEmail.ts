import nodemailer from 'nodemailer'
import { AUTH_EMAIL, AUTH_PW } from './secrets'

export type emailData = {
  email: string
  subject: string
  html: string
}

export const sendEmail = async (emailData: emailData) => {
  try {
    //create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PW,
      },
    })

    const mailOptions = {
      from: AUTH_EMAIL,
      to: emailData.email, //list of receivers
      subject: emailData.subject,
      html: emailData.html,
    }

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Message sent: %s', info.response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
