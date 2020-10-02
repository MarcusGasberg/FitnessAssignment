const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");

router.route("/")
    .get(programController.list)
    .post(programController.create);

router.route("/program")
    .get(programController.find)
    .post(programController.show);

router.route("/:name/program")
    .get(programController.edit)
    .post(programController.update);

router.route("/program/new")
    .get(programController.add);

module.exports = router;