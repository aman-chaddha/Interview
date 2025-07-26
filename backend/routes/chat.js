const express = require("express");
const router = express.Router();

const Session = require("../models/Session");
const Message = require("../models/Message");
const Product = require("../models/Product");
const Order = require("../models/Order");
const InventoryItem = require("../models/InventoryItem");

const askLLM = require("../utils/llm"); // Groq LLM integration

router.post("/", async (req, res) => {
  const { message, conversation_id } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Create or load session
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

    // Save user's message
    const userMsg = new Message({
      session: session._id,
      sender: "user",
      message,
    });
    await userMsg.save();

    // === Business logic ===

    // 1. Top 5 products
    if (message.toLowerCase().includes("top") && message.includes("products")) {
      const topProducts = await Product.find().sort({ total_sales: -1 }).limit(5);
      const names = topProducts.map((p, i) => `${i + 1}. ${p.name}`).join("\n");

      return res.json({
        session_id: session._id,
        ai_response: `Here are the top 5 best-selling products:\n\n${names}`,
      });
    }

    // 2. Order status
    if (message.toLowerCase().includes("order id")) {
      const matches = message.match(/\d+/g);
      if (matches) {
        const results = await Promise.all(
          matches.map(async (id) => {
            const order = await Order.findOne({ order_id: parseInt(id) });
            return order ? `Order ${id}: ${order.status}` : `Order ${id} not found`;
          })
        );
        return res.json({
          session_id: session._id,
          ai_response: results.join("\n"),
        });
      }
    }

    // 3. Inventory stock
    if (message.toLowerCase().includes("how many") && message.toLowerCase().includes("stock")) {
      const match = message.match(/how many (.+?) are/i);
      if (match) {
        const keyword = match[1].trim();
        const item = await InventoryItem.findOne({ name: new RegExp(keyword, "i") });

        if (item) {
          return res.json({
            session_id: session._id,
            ai_response: `There are ${item.stock} "${item.name}" left in stock.`,
          });
        } else {
          return res.json({
            session_id: session._id,
            ai_response: `Sorry, I couldn't find "${keyword}" in inventory.`,
          });
        }
      }
    }

    // === Fallback to LLM if no business logic matched ===
    const aiText = await askLLM(message);

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
