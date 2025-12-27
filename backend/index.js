import express from "express";
import testRoutes from "./routes/testRoutes.js";

const app = express();

app.use(express.json());

// 👇 THIS LINE IS CRITICAL
app.get("/", (req, res) => {
    res.send("Root working");
});

app.use("/api", testRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
