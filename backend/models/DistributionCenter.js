const mongoose = require("mongoose");

const DistributionCenterSchema = new mongoose.Schema({
    distribution_center_id: Number,
    name: String,
    address: String,
    phone: String,
});