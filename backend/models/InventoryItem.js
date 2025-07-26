const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema({
    inventory_item_id: Number,
    product_id: Number,
    distribution_center_id: Number,
    quantity: Number,
});

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);