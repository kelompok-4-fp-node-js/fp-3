var express = require("express");
var express = require("express");
var router = express.Router();

/* GET home page. */

router.use("/users", require("./user"));
router.use("/products", require("./products"));
router.use("/transactions", require("./transactions"));

module.exports = router;
