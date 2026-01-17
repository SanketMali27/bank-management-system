import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["FD", "MF", "STOCK", "GOLD"],
            required: true,
        },

        returns: {
            type: Number, // yearly %
            required: true,
        },

        risk: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true,
        },

        minAmount: {
            type: Number,
            required: true,
        },

        lockPeriod: {
            type: Number, // months
            default: 0,
        },
    },
    { timestamps: true }
);

const Investment = mongoose.model("Investment", investmentSchema);
export default Investment;
