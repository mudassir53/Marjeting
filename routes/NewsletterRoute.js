const express = require("express");
const {
  subscribeNewsletter,
  getSubscribers,
  unsubscribeNewsletter
} = require("../controller/NewsletterController");

const router = express.Router();

// ✅ Subscribe to Newsletter
router.post("/newsletter", subscribeNewsletter);

// ✅ Get all Subscribers
router.get("/newsletter", getSubscribers);

// ✅ Unsubscribe from Newsletter
router.delete("/newsletter/:id", unsubscribeNewsletter);

module.exports = router;
