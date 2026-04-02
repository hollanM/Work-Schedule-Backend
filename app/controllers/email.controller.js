import 'dotenv/config';
import nodemailer from "nodemailer";
import logger from "../config/logger.js";

const exports = {};

exports.sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    logger.warn('Email sending attempt with missing parameters');
    return res.status(400).send({
      message: "Recipient, subject, and either text or html content are required."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465 || process.env.EMAIL_SECURE === "true", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify().catch(err => {
      logger.error(`SMTP connection verification failed: ${err.message}`);
      throw new Error(`SMTP connection failed: ${err.message}`);
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Work Schedule" <no-reply@example.com>',
      to,
      subject,
      text,
      html,
    };

    logger.debug(`Attempting to send email to: ${to}`);
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    
    res.send({
      message: "Email sent successfully!",
      messageId: info.messageId
    });
  } catch (err) {
    logger.error(`Error sending email: ${err.message}`);
    res.status(500).send({
      message: err.message || "Some error occurred while sending the email.",
    });
  }
};

export default exports;
