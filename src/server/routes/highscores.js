var express = require('express');
var router = express.Router();
var highscoreController = require("../controllers/highscoreController");

router.route('/')
    .get(highscoreController.listTopTen)
    .post(highscoreController.create);

module.exports = router;
