const express = require("express");
var router = express.Router();
var programController = require("../controllers/programController");

router.get("/", programController.list);

router.get("/new", programController.create);
router.post("/new", programController.add);

router.post("/edit", programController.update);

module.exports = router;