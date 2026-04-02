import 'dotenv/config';
import nodemailer from "nodemailer";
import db from "../models/index.js";
import logger from "../config/logger.js";

const Notification = db.notification;
const exports = {};

// send email ================================
exports.sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  // If any of the fields are missing, return a bad request response
  if (!to || !subject || (!text && !html)) {
    logger.warn('Email sending attempt with missing parameters');
    return res.status(400).send({
      message: "Recipient, subject, and either text or html content are required."
    });
  }

  // Create a transporter object using SMTP transport
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

    // Verify connection configuration before sending email
    // this will throw an error if the SMTP connection fails which we can catch and log.
    await transporter.verify().catch(err => {
      logger.error(`SMTP connection verification failed: ${err.message}`);
      throw new Error(`SMTP connection failed: ${err.message}`);
    });

    // defines mail options 
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    logger.debug(`Attempting to send email to: ${to}`); // Remove when done testing
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`); // Remove when done testing
    
    // Create notification entry in the Notification table
    // Still needs ListID
    const notification = {
      title: subject,
      description: text || html,
      to: to,
      type: "email",
      date_time_sent: new Date(),
      is_read: false
    };

    // Log the notification creation attempt.
    // We'll still send the email even if the notification entry fails to be created. (though we really shouldn't.)
    await Notification.create(notification)
      .then(data => {
        logger.info(`Notification entry created for email: ${data.id}`);
      })
      .catch(err => {
        logger.error(`Error creating notification entry for email: ${err.message}`);
      });

      // Send response back to client with message ID for reference
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
