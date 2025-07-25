const { Product, ProductValidator } = require("./../moduls/products");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let data = await Product.find()
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({data});
});

router.get("/:id", async (req, res) => {
    let data = await Product.findById(req.params.id).populate("category");
    res.json(data);
});

router.post("/", async (req, res) => {
    try {
        let { value, error } = ProductValidator.validate(req.body);
        if (error) {
            return res.json({ message: error.details[0].message });
        }
        let data = new Product(value);
        await data.save();
        res.json(data);
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        let { value, error } = ProductValidator.validate(req.body);
        if (error) {
            return res.json({ message: error.details[0].message });
        }
        let data = await Product.findByIdAndUpdate(req.params.id, value, { new: true });
        res.json(data);
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let data = await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted", data });
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

module.exports = router;
