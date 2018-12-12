var express = require("express");
var router = express.Router();
const buyHandler = require("../handlers").buys;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", buyHandler.add);

module.exports = router;
