const Service = require("../model/Service");

// Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.protocol + "://" + req.get('host') + "/uploads/" + (req.file ? req.file.filename : "");

    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json({ message: "Service created", service: newService });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Find the existing service
    const existingService = await Service.findById(req.params.id);
    if (!existingService) return res.status(404).json({ message: "Service not found" });

    // Retain the existing image if no new image is uploaded
    const image = req.file 
      ? req.protocol + "://" + req.get('host') + "/uploads/" + req.file.filename 
      : existingService.image;

    // Update service
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
