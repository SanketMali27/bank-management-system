import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URL;
        if (!uri) {
            console.warn("MONGODB_URL not set. Skipping DB connection in development.");
            return;
        }

        await mongoose.connect(uri);
        console.log("Mongodb connected successfully");
    } catch (err) {
        console.error("mongodb connection failed:", err.message);
        console.error("Continuing without DB connection. Some features may not work.");
    }
};
export default connectDB;