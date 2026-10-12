const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// Default Route
// ===============================

app.get("/", (req, res) => {
    res.send("JWT Authentication Server is Running");
});

// ===============================
// MongoDB Connection
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        // Start server
        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });