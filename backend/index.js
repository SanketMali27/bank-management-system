import express from "express";
import accountroutes from "./routes/accountroutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
dotenv.config();
connectDB();
// 👇 THIS LINE IS CRITICAL
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});
app.use((req, res, next) => {
    console.log("HIT:", req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Root working");
});

app.use("/api/investments", investmentRoutes);

app.use("/api", accountroutes);
app.use("/api/transactions", transactionRoutes);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
