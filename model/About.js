const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("About", AboutSchema);
