import express from "express";
import { createAccount, getAccountByNumber, loginAccount } from "../controllers/AccountController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Account route working");
});

router.post("/account/login", loginAccount);

router.post("/account/create", createAccount);

router.get("/account/me", protect, getAccountByNumber);

export default router;
