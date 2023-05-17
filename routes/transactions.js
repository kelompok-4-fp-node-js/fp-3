var express = require("express");
var router = express.Router();

// const auth = require("../middlewares/auth");
const transactions = require("../controllers/transactionController");

router.post("/", transactions.post);
router.get("/user", transactions.getUserCustomer);
router.get("/admin", transactions.getUserAdmin);
router.get("/:transactionId", transactions.getById);

module.exports = router;
