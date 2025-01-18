const express = require("express");
const bodyParser = require("body-parser");
const qrRoute = require("./routes/qr");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/qr", qrRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
