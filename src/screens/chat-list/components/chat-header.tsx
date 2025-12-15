import { strings } from "./../strings";
import type { IChatRoom } from "../../../context/chat-context/types";

export const HeaderChatList = ({
  rooms,
  userJoinedRooms,
}: {
  rooms: IChatRoom[] | [];
  userJoinedRooms: IChatRoom[] | [];
}) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold text-gray-900 mr-3">{strings.rooms}</h2>
    <div className="flex flex-row gap-2">
      <div className="bg-gray-500 opacity-30 p-3">
        {`${rooms ? rooms.length : 0} ${strings.availableRooms}`}
      </div>
      <div className="bg-gray-500 opacity-30 p-3">
        {`${userJoinedRooms ? userJoinedRooms.length : 0} ${
          strings.joinedRooms
        }`}
      </div>
    </div>
  </div>
);
