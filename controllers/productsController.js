const { Product } = require("../models");
module.exports = class {
  static async post(req, res) {
    try {
      //       const CategoryId = req.body.CategoryId;
      const result = await Product.create(req.body);
      console.log(result.dataValues.price, "ini result post");

      // console.log(product.dataValues.price);
      // console.log("=======");
      const Price = result.dataValues.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
      const formatProductt = { ...result.dataValues };
      formatProductt.price = Price;
      const formatProduct = { ...formatProductt };

      return res.status(201).json({ products: formatProduct });
      // res.send("ok");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async get(req, res) {
    try {
      const result = await Product.findAll();
      console.log(result);
      console.log("================================================");
      const formatProduct = result.map((product) => {
        // console.log(product.dataValues.price);
        // console.log("=======");
        const Price = product.dataValues.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
        const formatProductt = { ...product.dataValues };
        formatProductt.price = Price;
        const formatProduct = { ...formatProductt };
        return formatProduct;
      });
      // const formatProduct = result.map(({ price, ...product }) => {
      //   // console.log(product.dataValues.price);
      //   // console.log("=======");
      //   const formatPrice = price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
      //   const formatProduct = { ...product.dataValues, formatPrice };
      //   return formatProduct;
      //   // console.log(price);
      // });
      console.log(formatProduct);
      res.status(201).json({ products: formatProduct });
      // res.send("y");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async put(req, res) {
    try {
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
      // console.log(updateProduct);
      const Price = updateProduct.dataValues.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
      const formatProductt = { ...updateProduct.dataValues };
      formatProductt.price = Price;
      const formatProduct = { ...formatProductt };
      res.status(200).json({ product: formatProduct });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async patch(req, res) {
    try {

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
      const Price = updateProduct.dataValues.price.toLocaleString("en-ID", { style: "currency", currency: "IDR" });
      const formatProductt = { ...updateProduct.dataValues };
      formatProductt.price = Price;
      const formatProduct = { ...formatProductt };
      res.status(200).json({ product: formatProduct });
      // res.status(200).json({ product: updateProduct });
      //       res.send("y");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async delete(req, res) {
    try {

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
