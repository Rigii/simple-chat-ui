import React, { useEffect } from "react";
import { ChatItem } from "./components/chat-item";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { Card, ListGroup, Badge } from "flowbite-react";
import type { IChatRoom } from "../../context/chat-context/types";
import { getAllChats } from "./chat-list.api";
import { useChatContext } from "../../context/chat-context/use-chat-context";

export const ChatList: React.FC = () => {
  const { user } = useUserContext();
  const { rooms = [], setAllRooms } = useChatContext();
  const navigate = useNavigate();

  const onItemClick = (chat: IChatRoom) => {
    console.log("Chat clicked:", chat);
  };

  useEffect(() => {
    if (!user?.nickname) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      return;
    }
    const getInitialChats = async () => {
      try {
        const chats = await getAllChats();
        setAllRooms(chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    getInitialChats();
  }, [rooms, setAllRooms]);

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          <Badge size="sm">{rooms ? rooms.length : 0} total</Badge>
        </div>

        {!rooms || rooms.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No chats yet</p>
          </div>
        ) : (
          <ListGroup className="border-none">
            {rooms.map((chat) => (
              <ChatItem key={chat._id} chat={chat} onClick={onItemClick} />
            ))}
          </ListGroup>
        )}
      </Card>
    </div>
  );
};
