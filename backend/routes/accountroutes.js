import express from "express";
import { createAccount } from "../controllers/AccountController.js";

const router = express.Router();


router.post("/account", createAccount);
export default router;
