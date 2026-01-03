import express from "express";
import { createAccount } from "../controllers/AccountController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Account route working");
});

router.post("/account/create", createAccount);
export default router;
