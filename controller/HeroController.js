const Hero = require("../model/Hero");

// Create Hero
exports.createHero = async (req, res) => {
  try {
    const { title, description } = req.body;
  
    const image1 = req.files["image1"] 
    ? `${req.protocol}://${req.get('host')}/uploads/${req.files["image1"][0].filename}` 
    : "";
  
  const image2 = req.files["image2"] 
    ? `${req.protocol}://${req.get('host')}/uploads/${req.files["image2"][0].filename}` 
    : "";
  

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

    // Use the existing image if no new image is uploaded
    const image1 = req.files["image1"]
      ? `${req.protocol}://${req.get('host')}/uploads/${req.files["image1"][0].filename}`
      : existingHero.image1; // Keep the existing image1 if no new image is uploaded

    const image2 = req.files["image2"]
      ? `${req.protocol}://${req.get('host')}/uploads/${req.files["image2"][0].filename}`
      : existingHero.image2; // Keep the existing image2 if no new image is uploaded

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
