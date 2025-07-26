const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    order_id: Number,
    user_id: Number,
    order_date: Date,
    status: String,
    total_amount: Number,
});

module.exports = mongoose.model("Order", OrderSchema);