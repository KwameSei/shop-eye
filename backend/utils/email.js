import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  try{
    // Email transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,  // for localhost
      },
    });

    // Email options
    const mailOptions = {
      from: sent_from,
      to: send_to,
      subject: subject,
      html: message,
      replyTo: reply_to,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

export default sendEmail;