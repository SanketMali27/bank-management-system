import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected sucessfully");
    } catch (err) {
        console.error("mongodb connection Failed", err.message);
        process.exit(1);
    }
};
export default connectDB;