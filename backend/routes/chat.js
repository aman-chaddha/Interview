const express = require("express");
const router = express.Router();

const Session = require("../models/Session");
const Message = require("../models/Message");


const getAIResponse = async (userMessage) => {

  return `You said: "${userMessage}"`;
};

router.post("/", async (req, res) => {
  const { message, conversation_id } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    let session;

    if (!conversation_id) {
      session = new Session({});
      await session.save();
    } else {
      session = await Session.findById(conversation_id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
    }

    const userMsg = new Message({
      session: session._id,
      sender: "user",
      message,
    });
    await userMsg.save();

    const aiText = await getAIResponse(message);


    const aiMsg = new Message({
      session: session._id,
      sender: "ai",
      message: aiText,
    });
    await aiMsg.save();

    return res.json({
      session_id: session._id,
      ai_response: aiText,
    });
  } catch (err) {
    console.error("❌ Chat error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
