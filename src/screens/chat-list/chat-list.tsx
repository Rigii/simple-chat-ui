import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { Card } from "flowbite-react";
import type { IChatRoom } from "../../context/chat-context/types";
import { useChatContext } from "../../context/chat-context/use-chat-context";
import { strings } from "./strings";
import { HeaderChatList } from "./components/chat-header";
import { RoomsList } from "./components/rooms-list";

export const ChatList: React.FC = () => {
  const { user } = useUserContext();
  const { rooms, userJoinedRooms, setActiveRoomId, joinRoom } =
    useChatContext();
  const navigate = useNavigate();

  const onItemClick = (chat: IChatRoom) => {
    setActiveRoomId(chat._id);
    navigate(`${SCREEN_ROUTES.CHAT_LIST}/${chat._id}`);
  };

  const onJoin = async (chat: IChatRoom) => {
    await joinRoom(chat._id);
  };

  useEffect(() => {
    if (!user?._id) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <HeaderChatList rooms={rooms} userJoinedRooms={userJoinedRooms} />
        <RoomsList
          title={strings.availableRooms}
          rooms={rooms}
          onselect={onJoin}
        />
        <RoomsList
          title={strings.joinedRooms}
          rooms={userJoinedRooms}
          onselect={onItemClick}
        />
      </Card>
    </div>
  );
};
