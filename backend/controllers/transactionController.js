import mongoose from "mongoose";
import transaction from '../models/Transaction.js';
import Account from '../models/Accounts.js';

export const depositMoney = async (req, res) => {
    try {
        const { amount } = req.body;
        const accountId = req.user.id;

        // validate input
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Deposit amount must be greater than zero"
            });
        }
        // find account
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }
        // update balance
        account.balance += amount;

        await account.save();
        // create transaction
        const newTransaction = new transaction({
            account: account._id,
            type: "credit",
            amount,
            description: "Deposit",
            balanceAfter: account.balance,
        });
        await newTransaction.save();
        res.status(201).json({
            success: true,
            message: "Deposit successful",
            transaction: newTransaction,
            balance: account.balance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const withdrawMoney = async (req, res) => {
    try {
        const { amount, description } = req.body;
        const accountId = req.user.id;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Withdraw amount must be greater than zero",
            });
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }

        // ❌ Prevent overdraft
        if (amount > account.balance) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance",
            });
        }

        // Update balance
        account.balance -= amount;
        await account.save();

        // Create transaction
        const newTransaction = await transaction.create({
            account: account._id,
            type: "debit",
            amount,
            description: description || "Withdrawal",
            balanceAfter: account.balance,
        });

        res.status(200).json({
            success: true,
            message: "Amount withdrawn successfully",
            transaction: newTransaction,
            balance: account.balance,
        });
    } catch (error) {
        console.error("Withdraw error:", error);
        res.status(500).json({
            success: false,
            message: " WITHDRAW  Server error",
        });
    }
};

/**
 * GET TRANSACTION HISTORY
 */
export const getTransactionHistory = async (req, res) => {
    try {
        const accountId = req.user.id;

        const transactions = await transaction.find({
            account: accountId,
        })
            .sort({ createdAt: -1 }) // latest first
            .limit(50); // safety limit

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions,
        });
    } catch (error) {
        console.error("Transaction history error:", error);
        res.status(500).json({
            success: false,
            message: " WITHDRAW  Server error",
        });
    }
};


export const transferMoney = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderId = req.user.id;
        const { receiverAccountNumber, amount } = req.body;

        if (!receiverAccountNumber || !amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Receiver account and valid amount required",
            });
        }

        const sender = await Account.findById(senderId).session(session);
        const receiver = await Account.findOne({
            accountNumber: receiverAccountNumber,
        }).session(session);

        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver account not found",
            });
        }

        if (sender.balance < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance",
            });
        }

        // 💰 Update balances
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ session });
        await receiver.save({ session });

        // 🧾 Transactions
        await Transaction.create(
            [
                {
                    account: sender._id,
                    type: "debit",
                    amount,
                    description: "Money transferred",
                    relatedAccount: receiver.accountNumber,
                },
                {
                    account: receiver._id,
                    type: "credit",
                    amount,
                    description: "Money received",
                    relatedAccount: sender.accountNumber,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Transfer successful",
            balance: sender.balance,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transfer error:", error);

        res.status(500).json({
            success: false,
            message: "Transfer failed",
        });
    }
};
