import express from "express";
import accountroutes from "./routes/accountroutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

dotenv.config();
connectDB();
// 👇 THIS LINE IS CRITICAL
app.get("/", (req, res) => {
    res.send("Root working");
});

app.use("/api", accountroutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
