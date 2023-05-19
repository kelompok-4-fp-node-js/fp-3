var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const products = require("../controllers/productsController");

router.post("/", auth, products.post);
router.get("/", auth, products.get);
router.put("/:productId", auth, products.put);
router.patch("/:productId", auth, products.patch);
router.delete("/:productId", auth, products.delete);

module.exports = router;
