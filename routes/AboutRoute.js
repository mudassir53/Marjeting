const express = require("express");
const upload = require("../middleware/Upload"); // Import Multer config
const {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout
} = require("../controller/AboutController");

const router = express.Router();

// ✅ Create About (Upload single image)
router.post("/about", upload.single("image"), createAbout);

// ✅ Get About
router.get("/about", getAbout);

// ✅ Update About (Upload single image)
router.put("/about/:id", upload.single("image"), updateAbout);

// ✅ Delete About
router.delete("/about/:id", deleteAbout);

module.exports = router;
