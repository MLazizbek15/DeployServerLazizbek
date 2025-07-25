const mongoose = require("mongoose");
const joi = require("joi");

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, required: true
     },
    image: { 
        type: String, required: true
     },
    price: { 
        type: Number, required: true
     },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Turlari"
    }
});

const Product = mongoose.model("Tavar", ProductSchema);

const ProductValidator = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    price: joi.number().required(),
    category: joi.string().required()
});

module.exports = { Product, ProductValidator };
