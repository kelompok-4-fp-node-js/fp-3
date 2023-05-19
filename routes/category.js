var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");
const category = require("../controllers/category");

router.post('/',adminAuth ,category.post)
router.get('/',adminAuth,category.get)
router.delete('/:id',adminAuth,category.delete)
router.patch('/:id',adminAuth,category.patch)

module.exports = router;
