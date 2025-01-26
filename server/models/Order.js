const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  participantId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  lastOrderTime: { type: Date, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
