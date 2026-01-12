import React from "react";
import { InputChatRoom } from "./components/room-text-input.component";
import { useChatRoomState } from "./state-hooks/chat-room.state";
import { RoomMessagesBlock } from "./components/room-messages.component";
import { useChatRoomSocketListener } from "./state-hooks/room-socket.state";
import { ChatRoomDetails } from "./components/room-details.component";

export const ChatRoom: React.FC = () => {
  const {
    messages,
    activeRoomCached,
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
        currentRoom={activeRoomCached}
        onlineParticipants={onlineParticipants}
      />
      <InputChatRoom currentRoom={activeRoomCached} setMessages={setMessages} />
    </div>
  );
};
