import { createContext, useReducer, useContext } from "react";

const ChatContext = createContext();

const initialState = {
  messages: [],
  loading: false,
  userInput: "",
  sessions: [],
  currentSessionId: null
};

function chatReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, userInput: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "RESET_INPUT":
      return { ...state, userInput: "" };
    case "SET_SESSIONS":
      return { ...state, sessions: action.payload };
    case "SET_SESSION_ID":
      return { ...state, currentSessionId: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
