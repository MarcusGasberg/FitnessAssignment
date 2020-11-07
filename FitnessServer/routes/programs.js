const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");

router
    .route("/programs")
    .get(programController.list)
    .post(programController.create);

router
    .route("/programs/:username")
    .get(programController.listByUsername);

router
    .route("/programs/:programId/exercises")
    .post(programController.createExercise);

module.exports = router;
