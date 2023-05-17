//todo: destructure input model
const { Product, TransactionHistory } = require("../models");
module.exports = class {
  static async post(req, res) {
    try {
      const productId = req.body.productId;
      const quantity = req.body.quantity;

      const productTarget = await Product.findByPk(productId);
      console.log(productTarget);
      if (!productTarget) {
        res.status(404).json({ message: "data with id " + productId + " not found" });
        return;
      }
      const stockCheck = productTarget.stock;
      console.log(stockCheck, "ini stok");
      if (quantity > stockCheck) {
        res.status(400).json({ message: "not enough product stock" });
        return;
      }
      // todo: menambahkan validasi balance user, field stock setelah dibeli dam sold_product_amount, menambahkan total price dari hasil perkalian harga produk dan quantity
      res.send("y");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserCustomer(req, res) {
    try {
      // todo: exclude transaction id, include product, total price IDR format
      const result = await TransactionHistory.findAll();
      res.status(200).json({ transactionHistories: result });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserAdmin(req, res) {
    try {
      // todo: exclude transaction id, include product dan user, total price IDR format
      const result = await TransactionHistory.findAll();
      res.status(200).json({ transactionHistories: result });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getById(req, res) {
    try {
      // todo: exclude transaction id, include product, total price IDR format
      const { transactionId } = req.params;
      const result = await TransactionHistory.findOne({ where: { id: transactionId } });
      if (!result) {
        res.status(404).json({ message: "data with id " + transactionId + " not found" });
        return;
      }
      res.status(200).json({ transactionHistories: result });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
