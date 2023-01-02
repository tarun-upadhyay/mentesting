const express = require("express");
const {cartData} = require("../Models/cart.model");
const app = express.Router();

app.post("/", async (req, res) => {
  console.log("hello");
  try {
    const { body } = req;
    const postData = new cartData(body);
    await postData.save();
    res.send("succesfully added");
  } catch (e) {
    res.send(e.message);
  }
});
module.exports = {app};
