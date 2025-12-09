import { useContext } from "react";
import { ChatContext } from "./chat-context";

export const useChatContext = () => {
  const context = useContext(ChatContext);

  return context || {};
};
