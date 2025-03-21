const express = require("express");
const upload = require("../middleware/Upload"); // Import Multer config
const {
  createService,
  getServices,
  updateService,
  deleteService
} = require("../controller/ServiceController");

const router = express.Router();

// ✅ Create Service (Upload single image)
router.post("/service", upload.single("image"), createService);

// ✅ Get all Services
router.get("/service", getServices);

// ✅ Update Service (Upload single image)
router.put("/service/:id", upload.single("image"), updateService);

// ✅ Delete Service
router.delete("/service/:id", deleteService);

module.exports = router;
