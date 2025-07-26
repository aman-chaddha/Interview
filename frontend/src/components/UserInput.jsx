import { useState } from "react";

const UserInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        placeholder="Ask your question..."
      />
      <button onClick={handleSend} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
};

export default UserInput;
