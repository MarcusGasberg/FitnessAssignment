var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  res.render("index", {
    title: "FitnessApp",
    layout: "layout.ejs",
    locals: {
      user: req.user,
    },
  });
});

module.exports = router;
