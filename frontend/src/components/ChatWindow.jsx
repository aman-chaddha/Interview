import { useChat } from "../context/ChatContext";
import axios from "axios";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import ConversationPanel from "./ConversationPanel";

const ChatWindow = () => {
  const { state, dispatch } = useChat();

  const handleSend = async (text) => {
    dispatch({ type: "ADD_MESSAGE", payload: { sender: "user", message: text } });
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: text,
        conversation_id: state.currentSessionId,
      });

      const aiMsg = {
        sender: "ai",
        message: res.data.ai_response,
      };

      dispatch({ type: "SET_SESSION_ID", payload: res.data.session_id });
      dispatch({ type: "ADD_MESSAGE", payload: aiMsg });
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div style={{
      width: "90%",
      margin: "40px auto",
      border: "1px solid #ccc",
      borderRadius: "10px",
      display: "flex",
      height: "80vh",
    }}>
      <ConversationPanel />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <h2 style={{ textAlign: "center", margin: "10px 0" }}>🛒 E-Commerce Chatbot</h2>
        <MessageList messages={state.messages} />
        <UserInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatWindow;
