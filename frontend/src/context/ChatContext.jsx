import { createContext, useReducer, useContext } from "react";

const ChatContext = createContext();

const initialState = {
  messages: [],
  loading: false,
  userInput: "",
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
