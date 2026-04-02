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
