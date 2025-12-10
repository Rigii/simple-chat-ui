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

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {!currentRoom || !user || messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>{strings.noMessages}</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.nickname === user.nickname ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.nickname === user.nickname
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <div className="flex flex-row gap-3">
                <p className="text-xs">{msg.nickname}</p>
                <p className="text-xs">
                  {new Date(msg?.created || "").toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm">{msg.message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
