const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const participants = JSON.parse(fs.readFileSync(path.join(__dirname, "../participants.json")));

const outputDir = path.join(__dirname, "../qr-codes");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

router.get("/generate", async (req, res) => {
  try {
    for (const participant of participants) {
      const qrData = JSON.stringify({ id: participant.id, name: participant.name });
      const qrp = path.join(outputDir, `${participant.id}.png`);

      await QRCode.toFile(qrp, qrData, { width: 300 });
      console.log(`QR Code generated for ${participant.name}`);
    }
    res.status(200).json({ message: "QR codes generated successfully" });
  } catch (error) {
    console.error("Error generating QR codes:", error);
    console.log("flag 12");
    console.log("Error generating QR codes:", error);
    res.status(500).json({ error: "Failed to generate QR codes" });
  }
});

module.exports = router;
