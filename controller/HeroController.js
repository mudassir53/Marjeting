const Hero = require("../model/Hero");
const cloudinary = require("../middleware/Cloudinary");

// Create Hero
exports.createHero = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Upload image1 to Cloudinary
    let image1 = "";
    if (req.files["image1"]) {
      const result1 = await cloudinary.uploader.upload(req.files["image1"][0].path);
      image1 = result1.secure_url; // Cloudinary URL for image1
    }

    // Upload image2 to Cloudinary
    let image2 = "";
    if (req.files["image2"]) {
      const result2 = await cloudinary.uploader.upload(req.files["image2"][0].path);
      image2 = result2.secure_url; // Cloudinary URL for image2
    }

    const newHero = new Hero({ title, description, image1, image2 });
    await newHero.save();
    res.status(201).json({ message: "Hero created", hero: newHero });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Heroes
exports.getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Hero by ID
exports.getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Hero
exports.updateHero = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Get the existing hero data from the database
    const existingHero = await Hero.findById(req.params.id);
    if (!existingHero) return res.status(404).json({ message: "Hero not found" });

    // Upload image1 to Cloudinary if a new image is provided, otherwise keep the existing image1
    let image1 = existingHero.image1; // Default to the existing image1
    if (req.files["image1"]) {
      // Upload new image1 to Cloudinary
      const result1 = await cloudinary.uploader.upload(req.files["image1"][0].path);
      image1 = result1.secure_url; // Update with Cloudinary URL
    }

    // Upload image2 to Cloudinary if a new image is provided, otherwise keep the existing image2
    let image2 = existingHero.image2; // Default to the existing image2
    if (req.files["image2"]) {
      // Upload new image2 to Cloudinary
      const result2 = await cloudinary.uploader.upload(req.files["image2"][0].path);
      image2 = result2.secure_url; // Update with Cloudinary URL
    }

    // Update the hero with the new data
    const updatedHero = await Hero.findByIdAndUpdate(
      req.params.id,
      { title, description, image1, image2 },
      { new: true }
    );

    res.status(200).json(updatedHero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Hero
exports.deleteHero = async (req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    if (!deletedHero) return res.status(404).json({ message: "Hero not found" });
    res.status(200).json({ message: "Hero deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
