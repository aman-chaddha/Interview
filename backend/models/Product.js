const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_id: Number,
    name: String,
    category: String,
    price: Number,
    rating: Number,
    total_sales: Number,
});

module.exports = mongoose.model("Product", ProductSchema);