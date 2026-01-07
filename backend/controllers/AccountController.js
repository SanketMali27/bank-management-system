import Account from "../models/Accounts.js";
import jwt from "jsonwebtoken";
export const createAccount = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            address,
            balance
        } = req.body;

        // validation
        if (!fullName || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // generate account number
        const accountNumber = "ACC" + Date.now();

        const account = new Account({
            fullName,
            email,
            phone,
            address,
            accountNumber,     // ✅ FIXED
            balance: balance ?? 0
        });

        await account.save();

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            account
        });

    } catch (error) {
        console.error("Error creating account:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const loginAccount = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email and account number are required",
            });
        }

        const account = await Account.findOne({ email });
        console.log(account);
        if (!account) {
            return res.status(401).json({
                success: false,
                message: "Invalid login details",
            });
        }
        const token = jwt.sign(
            { id: account._id },          // payload
            process.env.JWT_SECRET,       // secret
            { expiresIn: process.env.JWT_EXPIRE }
        );
        console.log("Generated JWT Token:", token);
        res.status(200).json({
            success: true,
            message: "Login successful",
            account, token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



export const getAccountByNumber = async (req, res) => {
    try {
        const { accountNumber } = req.params;

        const account = await Account.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }

        res.status(200).json({
            success: true,
            account,
        });
    } catch (error) {
        console.error("Error fetching account:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
