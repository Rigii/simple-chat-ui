import React from "react";
import { strings } from "./../strings";
import { useUserContext } from "../../../context/user-context/use-user-context";
import type {
  IChatRoom,
  IRoomMessage,
} from "../../../context/chat-context/types";

export const RoomMessagesBlock: React.FC<{
  messages: IRoomMessage[];
  currentRoom: IChatRoom | undefined;
}> = ({ messages, currentRoom }) => {
  const { user } = useUserContext();

  if (!currentRoom || !user) {
    return <div>{strings.failToLoadRoomDetails}</div>;
  }

  return (
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
  );
};
