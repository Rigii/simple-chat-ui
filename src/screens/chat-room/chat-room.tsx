import React, { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { HiPaperAirplane } from "react-icons/hi";
import { strings } from "./strings";
import type { IRoomMessage } from "../../context/chat-context/types";
import { useUserContext } from "../../context/user-context/use-user-context";
import { useChatContext } from "../../context/chat-context/use-chat-context";
import { getRoomMessages } from "./chat-room.api";
import { useParams } from "react-router-dom";
import { ChatRoomDetail } from "./room-detail";

export const ChatRoom: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const { user } = useUserContext();
  const { getActiveRoom } = useChatContext();
  const [messages, setMessages] = useState<IRoomMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  const currentRoom = getActiveRoom(chatId || "");

  useEffect(() => {
    if (!user?._id || !currentRoom?._id) {
      return;
    }
    const fetchRoomMessages = async () => {
      const roomMessages = await getRoomMessages({
        chatRoomId: currentRoom._id,
        userId: user._id,
        chunkLimit: 40,
      });

      setMessages(roomMessages);
    };

    fetchRoomMessages();
  }, [user?._id, currentRoom?._id]);

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
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatRoomDetail />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>{strings.noMessages}</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderName === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderName === user.nickname
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200  p-4">
        <div className="flex gap-2">
          <TextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} color="blue" className="px-4">
            <HiPaperAirplane className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
