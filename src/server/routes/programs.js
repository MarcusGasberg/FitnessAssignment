const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");

router
  .route("/")
  .get(programController.listPrograms)
  .post(programController.createProgram);

router.route("/:username").get(programController.listProgramsByUsername);

router.route("/:programId/exercises").post(programController.createExercise);

router
  .route("/:programId/exercises/:exerciseId")
  .put(programController.updateExercise)
  .delete(programController.deleteExercise);

router
  .route("/:programId")
  .put(programController.updateProgram)
  .delete(programController.deleteProgram);

module.exports = router;
