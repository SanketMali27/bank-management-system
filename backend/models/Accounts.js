import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },

    accountNumber: {
        type: String,
        required: true,
        unique: true
    },

    balance: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
},
    {
        timestamps: true
    });

const Account = mongoose.model("Account", accountSchema);

export default Account;

