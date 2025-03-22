const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
// Import Routes
const heroRoutes = require("./routes/HeroRoute");
const aboutRoutes = require("./routes/AboutRoute");
const serviceRoutes = require("./routes/ServiceRoute");
const newsletterRoutes = require("./routes/NewsletterRoute");

// Initialize Express App
const app = express();

// Serve images from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Fixed __dirname here

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://bhattimudassir897:MprVOulvDwMK0ljH@cluster0.3cjie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", heroRoutes);
app.use("/api", aboutRoutes);
app.use("/api", serviceRoutes);
app.use("/api", newsletterRoutes);

// Define Port & Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
