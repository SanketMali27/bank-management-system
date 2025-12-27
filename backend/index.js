const express = require("express");

const app = express();

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Bank Management Backend Running");
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

