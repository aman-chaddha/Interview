import { useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import UserInput from "./UserInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const handleSend = async (text) => {
    const userMsg = { sender: "user", message: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: text,
        conversation_id: conversationId,
      });

      const aiMsg = {
        sender: "ai",
        message: res.data.ai_response,
      };

      setConversationId(res.data.session_id);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat Error:", err);
    }
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "40px auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>🛍️ E-Commerce Chatbot</h2>
      <MessageList messages={messages} />
      <UserInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
