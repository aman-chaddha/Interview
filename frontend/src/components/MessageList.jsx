import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "10px", overflowY: "auto", flexGrow: 1 }}>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
