import routes from "./app/routes/index.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import db from "./app/models/index.js";
import logger from "./app/config/logger.js";

// Nodemailer
import nodemailer from "nodemailer";

// Needed for __dirname in ES modules
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create app
const app = express();

// Middleware
app.use(morgan("combined", { stream: logger.stream }));

const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/workerscheduling-t4", routes);

// ================= Nodemailer =================
// CHANGE 
// Move nodemailer into a routes file and a controller file.
// In the controller file, you can probs call the notifications controller to add a record of the email being sent to the database.
// Then run a chron task at 11:59 AM to scan schedules and somehow send emails 15 mins before a shift starts.
const transporter = nodemailer.createTransport({
  service: "purelymail",
  host: "smtp.purelymail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER ,
    pass: process.env.SMTP_PASS ,
  },
});

app.post("/send", (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing to, subject, or body" });
  }

  const mailOptions = {
    from: process.env.SMTP_USER, 
    to,                          
    subject,
    text: body,                  
    // html: body,               
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email" });
    }

    res.json({ message: "Email sent successfully", info });
  });
});
// ==============================================

// Serve HTML (fixed __dirname)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server AFTER DB sync
const PORT = process.env.PORT || 3100;

const startServer = async () => {
  try {
    await db.sequelize.sync();

    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

// Export logger + app
export { logger };
export default app;
