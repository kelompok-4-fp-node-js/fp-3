var express = require("express");
var express = require("express");
var router = express.Router();


router.use('/categories', require('./category'))
router.use("/users", require("./user"));
router.use("/products", require("./products"));
router.use("/transactions", require("./transactions"));

module.exports = router;
