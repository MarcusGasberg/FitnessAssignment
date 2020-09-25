var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up", layout: "layout.ejs", error: "" });
});

router.post("/", async function (req, res, next) {
  const User = mongoose.model("User");
  let newUser = new User(req.body);
  newUser.setPassword("" + req.body.password);

  await newUser.save((err) => {
    if (err) return handleError(err, res);
    else res.redirect("../");
  });
});

function handleError(err, res) {
  if (err.code == 11000) {
    res.render("sign-up", { error: "User Already Exists" });
  }
}

module.exports = router;
