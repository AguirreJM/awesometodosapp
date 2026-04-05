require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require("path"); // 1. Added this line

const app = express();
app.use(express.json());

// 2. These lines serve your React website from the server
// Note: We use "dist" because that is the folder you dragged in!
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();
