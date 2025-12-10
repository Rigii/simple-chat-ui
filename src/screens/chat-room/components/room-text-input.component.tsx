import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { HiPaperAirplane } from "react-icons/hi";
import { strings } from "../strings";
import type {
  IChatRoom,
  IRoomMessage,
} from "../../../context/chat-context/types";
import { useUserContext } from "../../../context/user-context/use-user-context";

export const InputChatRoom: React.FC<{
  currentRoom: IChatRoom;
  setMessages: React.Dispatch<React.SetStateAction<IRoomMessage[]>>;
}> = ({ currentRoom, setMessages }) => {
  const { user } = useUserContext();
  const [inputValue, setInputValue] = useState("");

  if (!currentRoom || !user) {
    return <div>{strings.failToLoadRoomDetails}</div>;
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !user) return;

    const newMessage: IRoomMessage = {
      _id: Date.now().toString(),
      message: inputValue,
      senderName: user.nickname,
      timestamp: new Date(),
      chatRoomId: currentRoom._id,
      senderId: user._id,
    };
    setMessages((messages) => [...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200  p-4">
      <div className="flex gap-2">
        <TextInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} color="blue" className="px-4">
          <HiPaperAirplane className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
