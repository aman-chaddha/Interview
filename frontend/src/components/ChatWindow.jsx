import axios from "axios";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { useChat } from "../context/ChatContext";
import { useState } from "react";

const ChatWindow = () => {
  const { state, dispatch } = useChat();
  const [conversationId, setConversationId] = useState(null);

  const handleSend = async (text) => {
    dispatch({ type: "ADD_MESSAGE", payload: { sender: "user", message: text } });
    dispatch({ type: "SET_LOADING", payload: true });

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
      dispatch({ type: "ADD_MESSAGE", payload: aiMsg });
    } catch (err) {
      console.error("Error:", err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
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
      <MessageList messages={state.messages} />
      <UserInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
