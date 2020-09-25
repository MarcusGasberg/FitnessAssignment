const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");

router.get("/", programController.list);

router.get("/find", programController.find);
router.post("/find", programController.show);

router.get("/new", programController.add);
router.post("/new", programController.create);

router.get("/edit/:name", programController.edit)
router.post("/edit", programController.update);

module.exports = router;