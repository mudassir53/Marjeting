const Newsletter = require("../model/NewsLetter");

// Subscribe to Newsletter
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Subscribers
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unsubscribe from Newsletter
exports.unsubscribeNewsletter = async (req, res) => {
  try {
    const deletedSubscriber = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deletedSubscriber) return res.status(404).json({ message: "Subscriber not found" });
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
