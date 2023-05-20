//todo: destructure input model
const { Product, TransactionHistory, User, Category } = require("../models");
module.exports = class {
  static async post(req, res) {
    try {
      const productId = req.body.productId;
      const quantity = req.body.quantity;

      const productTarget = await Product.findByPk(productId);
      // console.log(productTarget);
      if (!productTarget) {
        res.status(404).json({ message: "data with id " + productId + " not found" });
        return;
      }
      const stockCheck = productTarget.stock;
      // console.log(stockCheck, "ini stok");
      if (quantity > stockCheck) {
        res.status(400).json({ message: "not enough product stock" });
        return;
      }
      const userTarget = await User.findByPk(req.userLogin.id);
      // console.log(userTarget.dataValues.balance, "ini uang user");
      const totalPrice = quantity * productTarget.price;
      // console.log(totalPrice, "ini total harga");
      if (userTarget.dataValues.balance < totalPrice) {
        res.status(400).json({ message: "not enough balance" });
        return;
      }
      // todo: validasi field stock setelah dibeli dan sold_product_amount, menambahkan total price dari hasil perkalian harga produk dan quantity
      // patch stok produk
      const patchStock = stockCheck - quantity;
      await productTarget.update({ stock: patchStock });
      // console.log(patchStock);
      //patch balance user
      const patchBalance = userTarget.dataValues.balance - totalPrice;
      // console.log(patchBalance);
      await userTarget.update({ balance: patchBalance });
      //patch sold_amount category
      const categoryTarget = await Category.findByPk(productTarget.dataValues.CategoryId);
      // console.log(categoryTarget.sold_product_amount);
      const patchSoldAmount = categoryTarget.sold_product_amount + quantity;
      // console.log(patchSoldAmount);
      await categoryTarget.update({ sold_product_amount: patchSoldAmount });

      //create transaction history
      const result = await TransactionHistory.create({ ProductId: productId, UserId: userTarget.dataValues.id, quantity, total_price: totalPrice });
      // console.log(result, "ini result");
      const priceIDR = result.dataValues.total_price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });

      const response = {
        total_price: priceIDR,
        quantity: result.dataValues.quantity,
        product_name: productTarget.title,
      };
      // console.log(response);
      res.status(201).json({ message: "You have succesfully purchase the product", transactionBill: response });
      // res.send("y");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserCustomer(req, res) {
    try {
      // todo: total price IDR format
      const result = await TransactionHistory.findAll({
        attributes: { exclude: ["id"] },
        include: {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
      const formatTransaction = result.map((transaction) => {
        const final_total_price = transaction.dataValues.total_price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
        const product_final_price = transaction.dataValues.Product.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
        const formatTransactionn = { ...transaction.dataValues };
        formatTransactionn.total_price = final_total_price;
        formatTransactionn.Product.price = product_final_price;
        const formatTransaction = { ...formatTransactionn };
        return formatTransaction;
      });
      res.status(200).json({ transactionHistories: formatTransaction });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserAdmin(req, res) {
    try {
      // todo:  IDR format
      if (req.userLogin.role !== "admin") {
        res.status(403).json({ message: "You're prohibited to access this data" });
        return;
      }
      const result = await TransactionHistory.findAll({
        attributes: { exclude: ["id"] },
        include: [
          {
            model: Product,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: User,
            attributes: { exclude: ["password", "full_name", "createdAt", "updatedAt"] },
          },
        ],
      });
      const formatTransaction = result.map((transaction) => {
        const final_total_price = transaction.dataValues.total_price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
        const product_final_price = transaction.dataValues.Product.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
        const formatTransactionn = { ...transaction.dataValues };
        formatTransactionn.total_price = final_total_price;
        formatTransactionn.Product.price = product_final_price;
        const formatTransaction = { ...formatTransactionn };
        return formatTransaction;
      });
      res.status(200).json({ transactionHistories: formatTransaction });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getById(req, res) {
    try {
      // todo: IDR format
      // if (req.userLogin.role !== "admin") {
      //   res.status(403).json({ message: "You're prohibited to access this data" });
      //   return;
      // }
      const { transactionId } = req.params;
      // const findTransactions =  await TransactionHistory.findOne({where: { id: transactionId }})



      const result = await TransactionHistory.findOne({
        where: { id: transactionId },
        attributes: { exclude: ["id"] },
        include: {
          model: Product,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });

      if (!result) {
        res.status(404).json({ message: "data with id " + transactionId + " not found" });
        return;
      }

      
      if (req.userLogin.id !== result.UserId && req.userLogin.role !== "admin") {
        res.status(403).json({ message: "You're prohibited to access this data" });
        return;
      } 
      console.log('=========');

      // IDR format
      const final_total_price = result.dataValues.total_price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
      const product_final_price = result.dataValues.Product.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
      const formatTransactionn = { ...result.dataValues };
      formatTransactionn.total_price = final_total_price;
      formatTransactionn.Product.price = product_final_price;
      const formatTransaction = { ...formatTransactionn };

      res.status(200).json(formatTransaction);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
