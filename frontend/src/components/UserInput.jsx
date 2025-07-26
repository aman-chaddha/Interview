import { useChat } from "../context/ChatContext";

const UserInput = ({ onSend }) => {
  const { state, dispatch } = useChat();

  const handleSend = () => {
    if (state.userInput.trim()) {
      onSend(state.userInput);
      dispatch({ type: "RESET_INPUT" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd" }}>
      <input
        type="text"
        value={state.userInput}
        onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
        style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button onClick={handleSend} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        {state.loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default UserInput;
