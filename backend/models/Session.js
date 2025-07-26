const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    startedAt: {
        type: Date,
        default: Date.now,
    },
    sessionName: {
        type: String,
        default: "Untitled Session",
    },
});

module.exports = mongoose.model("Session", SessionSchema);