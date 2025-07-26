import { useEffect } from "react";
import axios from "axios";
import { useChat } from "../context/ChatContext";

const ConversationPanel = () => {
  const { state, dispatch } = useChat();

  useEffect(() => {
    axios.get("http://localhost:5000/api/conversations").then((res) => {
        console.log("Fetched sessions:", res.data);
      dispatch({ type: "SET_SESSIONS", payload: res.data });
    });
  }, []);

  const loadSession = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/conversations/${id}`);
      dispatch({ type: "SET_MESSAGES", payload: res.data.messages });
      dispatch({ type: "SET_SESSION_ID", payload: id });
    } catch (err) {
      console.error("Error loading session:", err);
    }
  };

  return (
    <div style={{
      width: "250px",
      borderRight: "1px solid #ccc",
      padding: "10px",
      overflowY: "auto",
    }}>
      <h3>Past Sessions</h3>
      {state.sessions.map((session) => (
        <div
          key={session._id}
          onClick={() => loadSession(session._id)}
          style={{
            cursor: "pointer",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: session._id === state.currentSessionId ? "#eee" : "transparent",
          }}
        >
          {session.name || session._id.slice(-6)}
        </div>
      ))}
    </div>
  );
};

export default ConversationPanel;
