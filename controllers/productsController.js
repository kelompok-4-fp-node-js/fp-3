const { Product } = require("../models");
module.exports = class {
  static async post(req, res) {
    try {
      //       const CategoryId = req.body.CategoryId;
      if (req.userLogin.role === "customer") {
        res.status(403).json({ message: "You're prohibited to access this data" });
        return;
      }
      const result = await Product.create(req.body);
      // console.log(result);
      // console.log(req.userLogin);
      res.status(201).json(result);
      // res.send("ok");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async get(req, res) {
    try {
      const result = await Product.findAll();
      // console.log(result);
      res.status(201).json({ products: result });
      // res.send("y");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async put(req, res) {
    try {
      if (req.userLogin.role !== "admin") {
        res.status(403).json({ message: "You're prohibited to access this data" });
        return;
      }
      const { productId } = req.params;
      //       const price = req.body.price;
      //       const stock = req.body.stock;
      //       const title = req.body.title;
      const updateTarget = await Product.findByPk(productId);
      //       console.log(updateTarget);
      if (!updateTarget) {
        res.status(404).json({ message: "data with id " + productId + " not found" });
        return;
      }
      //       const updateProduct = await updateTarget.update({ price, stock, title });
      const updateProduct = await updateTarget.update(req.body);
      console.log(updateProduct);
      res.status(200).json({ product: updateProduct });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async patch(req, res) {
    try {
      if (req.userLogin.role !== "admin") {
        res.status(403).json({ message: "You're prohibited to access this data" });
        return;
      }
      const { productId } = req.params;
      const CategoryId = req.body.CategoryId;
      const patchTarget = await Product.findByPk(productId);
      //       console.log(updateTarget);
      if (!patchTarget) {
        res.status(404).json({ message: "data with id " + productId + " not found" });
        return;
      }
      //       console.log(patchTarget);
      const updateProduct = await patchTarget.update({ CategoryId });
      // terdapat alternatif langsung memasukkan ke dalam variable patch target
      // partchTarget.CategoryId=CategoryId
      //await user.save()
      //       console.log(updateProduct);
      res.status(200).json({ product: updateProduct });
      //       res.send("y");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async delete(req, res) {
    try {
      if (req.userLogin.role !== "admin") {
        res.status(403).json({ message: "You're prohibited to access this data" });
        return;
      }
      const { productId } = req.params;

      const deleteTarget = await Product.findByPk(productId);
      //       console.log(updateTarget);
      if (!deleteTarget) {
        res.status(404).json({ message: "data with id " + productId + " not found" });
        return;
      }
      const deleteProduct = await deleteTarget.destroy();
      //       console.log(updateProduct);
      res.status(200).json({ message: "Product has been succesfully deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
