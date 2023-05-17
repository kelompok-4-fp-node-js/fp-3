const { User } = require("../models");
const jwt = require("../helpers/jwt");
const bcrypt = require("../helpers/bcrypt");
module.exports = class {

    static async register(req, res){
        try {

            const newUser = await User.create(req.body)

            // const userCredentials = newUser.toJSON({
            //     exclude: ['password', 'createdAt', 'updatedAt']
            //   });
              
            // console.log(userCredentials);
            const secure = JSON.parse(JSON.stringify(newUser));
            delete secure.password;
            delete secure.updatedAt;
            delete secure.createdAt;
            console.log('=======');

            res.status(201).json({user:secure})
        } catch (error) {
            res.status(500).json(error)

        }

    }
  

  static async login(req, res) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
        res.status(401).json({ message: "Email not found" });
        return;
      }

      const isCorrect = await bcrypt.comparePassword(req.body.password, userData.dataValues.password);
      if (!isCorrect) {
        throw {
          code: 401,
          message: "Password salah",
        };
      }

      const token = jwt.generateToken(userData.dataValues);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json(error);
    }
  }

    static async update (req,res){
        try {
            const userData = await User.findOne({where:{id: req.userLogin.id}})
            if(!userData){
                res.status(401).json({message: 'user not found'})
                return
            }
            const updateData = await User.update(req.body,{where: {id: req.userLogin.id},returning: true})

            console.log(updateData[1].dataValues);
            const secure = JSON.parse(JSON.stringify(updateData[1]));
            delete secure.password;
            delete secure.updatedAt;
            delete secure.createdAt;

            res.status(200).json({user : updateData[1]})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete (req,res){
        try {
            const findUser = await User.findOne({where:{id: req.userLogin.id}})

            if (!findUser) {
                res.status(401).json({message: 'User not found'})
                return
            }

            if (req.userLogin.id !== findUser.dataValues.id) {
                res.status(401).json({message: 'You not user this account'})
                return
            }

            const deleteData = await User.destroy({where: {id: req.userLogin.id},returning: true})
            res.status(200).json({message : "Your Account has been successfully deleted"})
        } catch (error) {
            res.status(500).json(error)
        }

  }

  static async addBalance (req,res){
    try {
        const findUser = await User.findOne({where:{id: req.userLogin.id}})

        if (!findUser) {
            res.status(401).json({message: 'User not found'})
            return
        }

        const newBalance = findUser.dataValues.balance + parseInt(req.body.balance)
        // console.log(parseInt(req.body.balance));
        // console.log(findUser.dataValues.balance);
        const updateBalance = await User.update({balance : newBalance},{where: {id: req.userLogin.id},returning: true})
        
        const formattedNumber = newBalance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        res.status(200).json({message : `Your balance has been successfuly updated to ${formattedNumber}`})

    } catch (error) {
        res.status(500).json(error)

    }
  }
};
