import express from "express";
import {
    depositMoney,
    withdrawMoney,
    getTransactionHistory,
} from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/deposit", protect, depositMoney);
router.post("/withdraw", protect, withdrawMoney);
router.get("/", protect, getTransactionHistory);
export default router;
