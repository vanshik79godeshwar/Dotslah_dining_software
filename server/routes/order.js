const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Handle QR code scans and food orders
router.post("/order", async (req, res) => {
  const { participantId, name, email } = req.body;

  try {
    // Fetch the most recent order for the participant
    const existingOrder = await Order.findOne({ participantId }).sort({ lastOrderTime: -1 });

    if (!existingOrder) {
      // First-time order
      const newOrder = new Order({
        participantId,
        name,
        email,
        lastOrderTime: new Date(),
      });
      await newOrder.save();
      return res.status(200).json({ message: "Order placed successfully for the first time!" });
    }

    // Check the time difference between now and the last order
    const currentTime = new Date();
    const timeDifference = (currentTime - existingOrder.lastOrderTime) / (1000 * 60 * 60); // Convert ms to hours

    if (timeDifference >= 3) {
      // Allow the order and create a new record
      const newOrder = new Order({
        participantId,
        name,
        email,
        lastOrderTime: currentTime,
      });
      await newOrder.save();
      return res.status(200).json({ message: "Order placed successfully!" });
    } else {
      // Deny the order as it's within the 3-hour limit
      return res.status(403).json({ message: "You can only order once every 3 hours!" });
    }
  } catch (error) {
    console.error("Error processing the order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
