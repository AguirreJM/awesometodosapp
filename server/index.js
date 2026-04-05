require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require("path");

const app = express();
app.use(express.json());

// 1. API Routes (Must come BEFORE the static files)
const router = require("./routes");
app.use("/api", router);

// 2. Serve the static files from the "dist" folder you moved into "server"
app.use(express.static(path.join(__dirname, "dist")));

// 3. The "Catch-all" route: If it's not an API call, serve the React app
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToMongoDB();
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

startServer();
