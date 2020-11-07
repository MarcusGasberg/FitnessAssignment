const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");
var auth = require("../auth");

router
  .route("/")
  .get(programController.list)
  .post(programController.create);

router
  .route("/program")
  .post(auth, programController.show);

router
  .route("/:username/programs")
  .get(programController.listByUsername)
  .post(auth, programController.update);

module.exports = router;
