import Account from "../models/Accounts.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const createAccount = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            password,
            address,
            balance
        } = req.body;


        // validation
        if (!fullName || !email || !phone || !address || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }
        console.log(password);
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }
        const existingUser = await Account.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with this email"
            });
        }

        const HashedPassword = await bcrypt.hash(password, 10);
        // generate account number
        const accountNumber = "ACC" + Date.now();

        const account = new Account({
            fullName,
            email,
            phone,
            address,
            password: HashedPassword,
            accountNumber,     // ✅ FIXED
            balance: balance ?? 0
        });

        await account.save();
        account.password = undefined;
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
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
        const ispasswordCorrect = await bcrypt.compare(password, account.password);
        if (!ispasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
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
        const account = await Account.findById(req.userId);

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
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
