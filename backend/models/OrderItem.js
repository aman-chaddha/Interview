const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
    order_item_id: Number,
    order_id: Number,
    product_id: Number,
    quantity: Number,
    price: Number,
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);