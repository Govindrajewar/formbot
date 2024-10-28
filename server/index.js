const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/User.js");
const formDataRoutes = require("./src/routes/FormData.js");
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(userRoutes);
app.use(formDataRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the FormBot Server",
    Version: "0.3",
    Date: getData(),
    Time: getTime(),
  });
});

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Server is Connected to Database on ${port}`))
    .catch((err) => console.error("MongoDB connection error: ", err));
});

function getData() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return `${day < 10 ? `0${day}` : day}-${
    month < 10 ? `0${month}` : month
  }-${year}`;
}

function getTime() {
  let hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();
  const period = hour >= 12 ? "PM" : "AM";

  if (hour >= 12) {
    hour = hour - 12;
  }

  return `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second} ${period}`;
}
