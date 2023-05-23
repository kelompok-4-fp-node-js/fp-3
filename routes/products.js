var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const adminAuth = require('../middlewares/adminAuth')
const products = require("../controllers/productsController");

router.post("/", adminAuth, products.post);
router.get("/", auth, products.get);
router.put("/:productId", adminAuth, products.put);
router.patch("/:productId", adminAuth, products.patch);
router.delete("/:productId", adminAuth, products.delete);

module.exports = router;
