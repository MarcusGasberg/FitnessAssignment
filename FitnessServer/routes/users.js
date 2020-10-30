var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-out", function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
