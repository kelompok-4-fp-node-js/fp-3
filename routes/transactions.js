var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const transactions = require("../controllers/transactionController");

router.post("/", auth, transactions.post);
router.get("/user", auth, transactions.getUserCustomer);
router.get("/admin", auth, transactions.getUserAdmin);
router.get("/:transactionId", auth, transactions.getById);

module.exports = router;
