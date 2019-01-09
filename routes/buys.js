var express = require("express");
var router = express.Router();
const buyHandler = require("../handlers").buys;

router
  .route("/")
  .post(buyHandler.add)
  .get(buyHandler.get);

router.route("/:id")
      .put(buyHandler.update)

module.exports = router;
