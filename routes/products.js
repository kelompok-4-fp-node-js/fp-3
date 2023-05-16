var express = require("express");
var router = express.Router();

// const auth = require("../middlewares/auth");
const products = require("../controllers/productsController");

router.post("/", products.post);
router.get("/", products.get);
router.put("/:productId", products.put);
router.patch("/:productId", products.patch);
router.delete("/:productId", products.delete);

module.exports = router;
