const { Category, Product } = require("../models");

module.exports = class {
    static async post(req, res){
        try {
            const findCategory = await Category.findOne({where: {type: req.body.type}})

            if (findCategory) {
                res.status(409).json({ message: "This category is already" });
                return;
            }

            const newCategory = await Category.create({type : req.body.type,sold_product_amount : 0})
            res.status(201).json({category:newCategory})
            
        } catch (error) {
            res.status(500).json(error) 
        }

    }
    static async get(req, res){
        try {
            const getAllCategory = await Category.findAll({include :{ model: Product}})
            res.status(201).json({category:getAllCategory})

        } catch (error) {
            res.status(500).json(error) 
        }
    }
    static async patch(req, res){
        try {
            const findCategoryById = await Category.findOne({where: {id: req.params.id}})

            if (!findCategoryById) {
                res.status(404).json({ message: "This category not found" });
                return;
            }

            const findCategory = await Category.findOne({where: {type: req.body.type}})

            if (findCategory) {
                res.status(409).json({ message: "This category is already" });
                return;
            }

            const patch = await Category.update({type:req.body.type},{where: {id: req.params.id},returning: true})
            res.status(201).json({category:patch[1][0]})

        } catch (error) {
            res.status(500).json(error) 

        }
    }
    static async delete(req, res){
        try {
            const findCategoryById = await Category.findOne({where: {id: req.params.id}})

            if (!findCategoryById) {
                res.status(404).json({ message: "This category not found" });
                return;
            }

            const findCategory = await Category.findOne({where: {id: req.params.id}})

            if (!findCategory) {
                res.status(404).json({ message: "This category not found" });
                return;
            }

            const deleteData = await Category.destroy({where: {id: req.params.id},returning: true})
            res.status(200).json({message : "Category has been successfully deleted"})

        } catch (error) {
            res.status(500).json(error) 

        }
    }
}