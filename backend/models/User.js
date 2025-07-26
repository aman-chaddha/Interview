const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: Number,
    name: String,
    email: String,
    password: String,
    address: String,
    phone: String,
});

module.exports = mongoose.model("User", UserSchema);