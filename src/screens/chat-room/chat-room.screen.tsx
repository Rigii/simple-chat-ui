import React from "react";
import { InputChatRoom } from "./components/room-text-input.component";
import { useChatRoomState } from "./state-hooks/chat-room.state";
import { RoomMessagesBlock } from "./components/room-messages.component";
import { useChatRoomSocketListener } from "./state-hooks/room-socket.state";
import { ChatRoomDetails } from "./components/room-details.component";

export const ChatRoom: React.FC = () => {
  const {
    messages,
    currentRoom,
    onlineParticipants,
    setMessages,
    setOnlineParticipants,
  } = useChatRoomState();
  useChatRoomSocketListener({ setMessages, setOnlineParticipants });

  return (
    <div className="flex flex-col h-screen">
      <ChatRoomDetails
        messages={messages}
        onlineParticipants={onlineParticipants}
      />

      <RoomMessagesBlock
        messages={messages}
        currentRoom={currentRoom}
        onlineParticipants={onlineParticipants}
      />
      <InputChatRoom currentRoom={currentRoom} setMessages={setMessages} />
    </div>
  );
};
