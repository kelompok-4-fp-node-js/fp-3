var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const user = require("../controllers/user");

router.post('/register', user.register)
router.post('/login',user.login)
router.put('/',auth,user.update)
router.delete('/',auth,user.delete)
router.patch('/topup',auth,user.addBalance)

module.exports = router;
