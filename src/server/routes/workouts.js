const express = require("express");
var router = express.Router();
var workoutController = require("../controllers/workoutController");

router.route("/").post(workoutController.createWorkout);
router.route("/:username").get(workoutController.listWorkoutsByUsername);

module.exports = router;
