const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema({
  image1: { type: String },
  image2: { type: String },
  title: { type: String, },
  description: { type: String },
});

module.exports = mongoose.model("Hero", HeroSchema);
