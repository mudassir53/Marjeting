const About = require("../model/About");

// Create About
exports.createAbout = async (req, res) => {
  try {
    const { description } = req.body;
    const image = req.protocol + "://" + req.get('host') + "/uploads/" + (req.file ? req.file.filename : "");

    const newAbout = new About({ description, image });
    await newAbout.save();
    res.status(201).json({ message: "About section created", about: newAbout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get About
exports.getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update About
exports.updateAbout = async (req, res) => {
  try {
    const { description } = req.body;
    
    // Find existing about data
    const existingAbout = await About.findById(req.params.id);
    if (!existingAbout) {
      return res.status(404).json({ message: "About not found" });
    }

    // If the user uploads a new image, update it; otherwise, keep the existing image
    const image = req.file 
      ? req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename 
      : existingAbout.image;

    // Update the document
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { description, image },
      { new: true }
    );

    res.status(200).json(updatedAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete About
exports.deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);
    if (!deletedAbout) return res.status(404).json({ message: "About not found" });
    res.status(200).json({ message: "About deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
