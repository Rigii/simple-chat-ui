import React from "react";
import { formatDate, getInitials } from "../../../services/common.service";
import type { IChatRoom } from "../../../context/chat-context/types";

export const ChatItem: React.FC<{
  chat: IChatRoom;
  onClick: (chat: IChatRoom) => void;
}> = ({ chat, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(chat);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(chat)}
      onKeyDown={handleKeyDown}
      className="flex items-center border justify-between gap-3 p-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white font-medium">
          {getInitials(chat.chat_name)}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-500 truncate">
            {chat.chat_name}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 whitespace-nowrap">
        {formatDate(chat.updated)}
      </div>
    </div>
  );
};
