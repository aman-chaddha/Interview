const Message = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <div
      style={{
        backgroundColor: isUser ? "#DCF8C6" : "#F1F0F0",
        alignSelf: isUser ? "flex-end" : "flex-start",
        padding: "10px 15px",
        margin: "5px",
        borderRadius: "15px",
        maxWidth: "60%",
      }}
    >
      <p style={{ margin: 0 }}>{message.message}</p>
    </div>
  );
};

export default Message;
