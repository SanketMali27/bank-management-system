import Account from "../models/Accounts.js";

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
