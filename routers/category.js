const { Category, CategoryValidator } = require("./../moduls/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let data = await Category.find()
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({data});
});

router.get("/:id", async (req, res) => {
    let data = await Category.findById(req.params.id);
    res.json(data);
});

router.post("/", async (req, res) => {
    try {
        let { value, error } = CategoryValidator.validate(req.body);
        if (error) {
            return res.json({ message: error.details[0].message });
        }
        let data = new Category(value);
        await data.save();
        res.json(data);
    } catch (e) {
        res.status(400).json({ message: e });
    }
});


router.patch("/:id", async (req, res) => {
    try {
        let { value, error } = CategoryValidator.validate(req.body);
        if (error) {
            return res.json({ message: error.details[0].message });
        }
        let data = await Category.findByIdAndUpdate(req.params.id, value, { new: true });
        res.json(data);
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let data = await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted", data });
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

module.exports = router;
