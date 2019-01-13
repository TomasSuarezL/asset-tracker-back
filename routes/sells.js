var express = require("express");
var router = express.Router();
const sellHandler = require("../handlers").sells;

router.route("/").post(sellHandler.add);

module.exports = router;
