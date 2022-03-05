const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (!err) console.log("App Runing..!");
});
