const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");
var auth = require("../auth");

router
  .route("/")
  .get(programController.list)
  .post(auth, programController.create);

router
  .route("/program")
  .get(auth, programController.find)
  .post(auth, programController.show);

router
  .route("/:name/program")
  .get(auth, programController.edit)
  .post(auth, programController.update);

router.route("/program/new").get(programController.add);

module.exports = router;
