import React from "react";
import { InputChatRoom } from "./components/room-text-input.component";
import { useChatRoomState } from "../state-hooks/chat-room.state";
import { RoomMessagesBlock } from "./components/room-messages.component";
import { useChatRoomSocketListener } from "../state-hooks/room-socket.state";

export const ChatRoom: React.FC = () => {
  const { messages, currentRoom, setMessages, setOnlineParticipants } =
    useChatRoomState();
  useChatRoomSocketListener({ setMessages, setOnlineParticipants });

  return (
    <div className="flex flex-col h-screen">
      <RoomMessagesBlock messages={messages} currentRoom={currentRoom} />
      <InputChatRoom currentRoom={currentRoom} setMessages={setMessages} />
    </div>
  );
};
