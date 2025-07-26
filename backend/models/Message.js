const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    session: { type: mongoose.Schema.Types.ObjectId, 
        ref: "Session",
    required: true,},
    sender: {
        type: String,
        enum: ["user", "ai"],
        required: true,
    },

    message: {
        type: String,
        required: true,
    },
    timestamp: { type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", MessageSchema);