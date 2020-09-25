var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/", function (req, res, next) {
  res.render("sign-in", { title: "Sign In", layout: "layout.ejs", error: "" });
});

router.post("/", async function (req, res, next) {
  const User = mongoose.model("User");
  const u = await User.findOne({ email: req.body.email });

  if (u) {
    const pwd = "" + req.body.password;
    const valid = u.validatePassword(pwd);
    if (valid) {
      res.redirect("../");
    }
  }

  handleLoginError(res, "Wrong Password or Email");
});

function handleLoginError(res, msg) {
  res.render("sign-in", { error: msg });
}

module.exports = router;
