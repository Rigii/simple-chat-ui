import React, { useEffect } from "react";
import { ChatItem } from "./components/chat-item";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { Card, ListGroup, Badge } from "flowbite-react";
import type { IChatRoom } from "../../context/chat-context/types";

export const ChatList: React.FC = () => {
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
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          <Badge size="sm">{items.length} total</Badge>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No chats yet</p>
          </div>
        ) : (
          <ListGroup className="border-none">
            {items.map((chat) => (
              <ChatItem key={chat.id} chat={chat} onClick={onItemClick} />
            ))}
          </ListGroup>
        )}
      </Card>
    </div>
  );
};
