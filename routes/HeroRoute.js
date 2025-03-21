const express = require("express");
const upload = require("../middleware/Upload"); // Import Multer config
const {
  createHero,
  getHeroes,
  getHeroById,
  updateHero,
  deleteHero
} = require("../controller/HeroController");

const router = express.Router();

// ✅ Create Hero (Upload 2 images)
router.post("/hero", upload.fields([{ name: "image1" }, { name: "image2" }]), createHero);

// ✅ Get All Heroes
router.get("/hero", getHeroes);

// ✅ Get Hero by ID
router.get("/hero/:id", getHeroById);

// ✅ Update Hero (Upload 2 images)
router.put("/hero/:id", upload.fields([{ name: "image1" }, { name: "image2" }]), updateHero);

// ✅ Delete Hero
router.delete("/hero/:id", deleteHero);

module.exports = router;
