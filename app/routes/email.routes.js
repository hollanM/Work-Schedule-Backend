import email from "../controllers/email.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Send an email
router.post("/send", email.sendEmail);

export default router;
