var express = require("express");
var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
=======
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", layout: "layout.ejs" });
>>>>>>> e0fbd206dfb59e79ea2bac43064f35a2a0332e35
});

module.exports = router;
