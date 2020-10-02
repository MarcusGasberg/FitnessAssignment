var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "jwt",
  getToken: (req) => req.cookies.jwt,
});

/* GET home page. */
router.get("/", auth, function (req, res, next) {
  res.render("index", { title: "FitnessApp", layout: "layout.ejs" });
});

module.exports = router;
