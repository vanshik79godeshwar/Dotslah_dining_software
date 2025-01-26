const express = require("express");
const bodyParser = require("body-parser");
const qrRoute = require("./routes/qr");
const cors = require("cors");
const connectDB = require("./db");
const orderRoute = require("./routes/order");


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use("/qr", qrRoute);
app.use("/api", orderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
