var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", function (req, res, next) {
  res.render("sign-in", {
    title: "Sign In",
    layout: "layout.ejs",
    error: "",
    user: req.user,
  });
});

router.post("/", async function (req, res, next) {
  const User = mongoose.model("User");
  const u = await User.findOne({ email: req.body.email });

  if (u) {
    const pwd = "" + req.body.password;
    const valid = u.validatePassword(pwd);
    if (valid) {
      const accessToken = u.generateJwt();
      res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
      res.redirect("../");
    }
  } else {
    handleLoginError(res, "Wrong Password or Email");
  }
});

function handleLoginError(res, msg) {
  res.render("sign-in", { error: msg, user: req.user });
}

module.exports = router;
