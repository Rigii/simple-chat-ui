import React, { useEffect } from "react";
import type { IChatRoom } from "./types";
import { ChatItem } from "./components/chat-item";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";

const ChatList: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const items: IChatRoom[] = [];

  const onItemClick = (chat: IChatRoom) => {
    console.log("Chat clicked:", chat);
  };

  useEffect(() => {
    if (!user?.nickname) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Chat List</h2>
      <div className="divide-y divide-gray-200 rounded-md border border-gray-100 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No chats yet.</div>
        ) : (
          items.map((chat) => (
            <ChatItem key={chat.id} chat={chat} onClick={onItemClick} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
