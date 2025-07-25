const mongoose = require("mongoose");
const joi = require("joi");

const CategorySchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    image: { 
        type: String, required: true 
    }
});

const Category = mongoose.model("Turlari", CategorySchema);

const CategoryValidator = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required()
});

module.exports = { Category, CategoryValidator };
