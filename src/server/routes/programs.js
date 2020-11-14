const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");

router
  .route("/")
  .get(programController.list)
  .post(programController.create);

router.route("/:username").get(programController.listByUsername);

router.route("/:programId/exercises").post(programController.createExercise);

router.route("/:programId")
  .put(programController.update)
  .delete(programController.delete);

module.exports = router;
