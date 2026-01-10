import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },

        type: {
            type: String,
            enum: ["credit", "debit"],
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        description: {
            type: String,
            trim: true,
        },

        balanceAfter: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["success", "failed"],
            default: "success",
        },
        relatedAccount: String,
        treansferMoneyList: [],
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
