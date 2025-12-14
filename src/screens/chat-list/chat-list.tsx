import React, { useEffect } from "react";
import { ChatItem } from "./components/chat-item";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { Card, List } from "flowbite-react";
import type { IChatRoom } from "../../context/chat-context/types";
import { useChatContext } from "../../context/chat-context/use-chat-context";
import { strings } from "./strings";

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{strings.rooms}</h2>
          <div className="flex flex-row gap-2">
            <div className="bg-gray-500 p-3">
              {rooms ? rooms.length : 0} {strings.allAvailableRooms}
            </div>
            <div className="bg-gray-500 p-3">
              {userJoinedRooms ? userJoinedRooms.length : 0}
              {strings.joinedRooms}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between mb-6">
          {!rooms || rooms.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">{strings.noRoomsYet}</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {strings.availableRooms}
              </h2>
              <List className="flex flex-col gap-y-2">
                {rooms.map((chat) => (
                  <ChatItem key={chat._id} chat={chat} onClick={onJoin} />
                ))}
              </List>
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-between mb-6">
          {!userJoinedRooms || userJoinedRooms.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">{strings.noJoinedRoomsYet}</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {strings.joinedRooms}
              </h2>
              <List className="flex flex-col gap-y-2">
                {userJoinedRooms.map((chat) => (
                  <ChatItem key={chat._id} chat={chat} onClick={onItemClick} />
                ))}
              </List>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
