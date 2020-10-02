var express = require("express");
var router = express.Router();
var verify = require("jsonwebtoken").verify;
const mongoose = require("mongoose");

/* GET home page. */
router.get("/", async function (req, res, next) {
  var user;
  if (req.cookies.jwt) {
    try {
      var decoded = verify(req.cookies.jwt, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).send("unauthorized");
    }

    const User = mongoose.model("User");
    user = await User.findOne({ _id: decoded._id });
  }

  res.render("index", {
    title: "FitnessApp",
    layout: "layout.ejs",
    locals: {
      user: user,
    },
  });
});

module.exports = router;
