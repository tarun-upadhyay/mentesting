const express = require("express");

const { UserSchema } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const app = express.Router();

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let oldUser = await UserSchema.findOne({ email });
    if (oldUser) {
      return res.send({ msg: "already" });
    }
    bycrypt.hash(password, 4, async function (err, hash) {
      const user = new UserSchema({ username, email, password: hash });
      await user.save();
      res.send({ msg: "success" });
    });
  } catch (e) {
    res.send(e.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserSchema.findOne({ email });
    if (user) {
      let hashed_password = user.password;
      bycrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "hush");
          res.send({ msg: "success", token: token });
        } else {
          res.send({ msg: "incorrect password" });
        }
      });
    } else {
      res.send({ msg: "email not resgisterd" });
    }
  } catch (e) {
    res.send(e.message);
  }
});
module.exports = {app};
