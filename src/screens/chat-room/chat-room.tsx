import React from "react";
import { strings } from "./strings";
import { ChatRoomDetail } from "./components/room-details.component";
import { InputChatRoom } from "./components/room-text-input.component";
import { useChatRoomState } from "./chat-room.state";
import { RoomMessagesBlock } from "./components/room-messages.component";

export const ChatRoom: React.FC = () => {
  const { user, messages, currentRoom, setMessages } = useChatRoomState();

  if (!currentRoom || !user) {
    return <div>{strings.failToLoadRoomDetails}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatRoomDetail />
      <RoomMessagesBlock messages={messages} currentRoom={currentRoom} />
      <InputChatRoom currentRoom={currentRoom} setMessages={setMessages} />
    </div>
  );
};
