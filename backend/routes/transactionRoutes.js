import express from "express";
import {
    depositMoney,
    withdrawMoney,
    getTransactionHistory,
    transferMoney, getTransferHistory
} from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/deposit", protect, depositMoney);
router.post("/withdraw", protect, withdrawMoney);
router.get("/", protect, getTransactionHistory);
router.post("/transfer", protect, transferMoney);
// routes/transactionRoutes.js
router.get("/transfer-history", protect, getTransferHistory);

export default router;
