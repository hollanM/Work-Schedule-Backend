import 'dotenv/config';
import nodemailer from "nodemailer";
import db from "../models/index.js";
import logger from "../config/logger.js";

const Notification = db.notification;
const User = db.user;
const NotificationList = db.notification_list;

// Google Oauth2 transporter setup (AAAAA)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const exports = {};

// Get user_id by email passed in by json body
exports.getUserIdByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return { userId: user.id, departmentId: user.department_id };
    } else {
      logger.warn(`No user found with email: ${email}`);
      return null;
    }
  } catch (err) {
    logger.error(`Error fetching user by email: ${err.message}`);
    throw err;
  }
}

// Get notification list entry by user_id
exports.getNotificationListByUserId = async (userId) => {
  try {
    const notificationListEntry = await NotificationList.findOne({ where: { user_id: userId } });
    if (notificationListEntry) {
      return notificationListEntry;
    } else {
      logger.warn(`No notification list entry found for user ID: ${userId}`);
      return null;
    }
  } catch (err) {
    logger.error(`Error fetching notification list by user ID: ${err.message}`);
    throw err;
  }
}


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

  try {
    // define mail options 
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    logger.debug(`Attempting to send email via OAuth2 to: ${to}`);
    // transporter.sendMail will automatically check for token expiration and refresh if needed
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent via OAuth2: ${info.messageId}`);
    
    const userId = await exports.getUserIdByEmail(to);
    const notificationListEntry = await exports.getNotificationListByUserId(userId ? userId.userId : null); // if userId is null, give the var null

    // output user id and department id to logs for debugging
    if (userId) {
      logger.debug(`Email recipient user ID: ${userId.userId}, department ID: ${userId.departmentId}`);
    } else {
      logger.warn(`Could not find user ID for email recipient: ${to}`);
    }

    // Create notification entry in the Notification table
    const notification = {
      title: subject,
      description: text || html,
      to: to,
      type: "email",
      date_time_sent: new Date(),
      notification_list_id: notificationListEntry.id,
      is_read: false
    };

    await Notification.create(notification)
      .then(data => {
        logger.info(`Notification entry created for email: ${data.id}`);
      })
      .catch(err => {
        logger.error(`Error creating notification entry for email: ${err.message}`);
      });

    // Send response back to client with message ID for reference
    res.send({
      message: "Email sent successfully via OAuth2!",
      messageId: info.messageId
    });
  } catch (err) {
    logger.error(`Error sending email via OAuth2: ${err.message}`);
    res.status(500).send({
      message: err.message || "Some error occurred while sending the email.",
    });
  }
};

export default exports;
