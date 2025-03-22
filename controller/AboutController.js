const About = require("../model/About");
const cloudinary = require("../middleware/Cloudinary");

// Create About
exports.createAbout = async (req, res) => {
  try {
    const { description } = req.body;

    // Upload image to Cloudinary (if provided)
    let image = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "about",
        public_id: `about_${Date.now()}`
      });
      image = result.secure_url;
    }

    // Create new About entry
    const newAbout = new About({ description, image });
    await newAbout.save();

    res.status(201).json({
      message: "About section created successfully",
      about: newAbout
    });
  } catch (err) {
    console.error("Error creating About:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get About
exports.getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (err) {
    console.error("Error fetching About:", err.message);
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
      return res.status(404).json({ message: "About section not found" });
    }

    // Upload new image if provided
    let image = existingAbout.image;
    if (req.file) {
      // Delete existing image from Cloudinary
      if (existingAbout.image) {
        const publicId = existingAbout.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`about/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "about",
        public_id: `about_${Date.now()}`
      });
      image = result.secure_url;
    }

    // Update the About entry
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { description, image },
      { new: true }
    );

    res.status(200).json({
      message: "About section updated successfully",
      about: updatedAbout
    });
  } catch (err) {
    console.error("Error updating About:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete About
exports.deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    // Delete image from Cloudinary
    if (about.image) {
      const publicId = about.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`about/${publicId}`);
    }

    await About.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "About section deleted successfully" });
  } catch (err) {
    console.error("Error deleting About:", err.message);
    res.status(500).json({ error: err.message });
  }
};
