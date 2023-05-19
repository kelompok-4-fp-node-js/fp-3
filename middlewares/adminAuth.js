const jwt = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const payload = jwt.verifyToken(req.headers.token);
    if (!payload) {
      res.status(404).send({ message: "user not found payload" });
    }
        const userData = await User.findOne({
            where: { email: payload.email, password: payload.password },
        })

        if (!userData) {
            res.status(404).send({ message: 'user not found' })
            return
        }
        if (userData.dataValues.role !== 'admin') {
            res.status(404).send({ message: 'You not admin' })
            return
        }
            req.userLogin = userData.dataValues
            next()
        
    } catch (err) {
        res.status(404).send({
            status: 404,
            message: 'User not found',
        })
    }
  } 
