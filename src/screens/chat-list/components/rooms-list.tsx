import { List } from "flowbite-react";
import type { IChatRoom } from "../../../context/chat-context/types";
import { strings } from "./../strings";
import { ChatItem } from "./chat-item";

export const RoomsList = ({
  title,
  rooms,
  onselect,
}: {
  title: string;
  rooms: IChatRoom[];
  onselect: (chat: IChatRoom) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-between mb-6">
      {!rooms || rooms.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">{strings.noRoomsYet}</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
          <List className="flex flex-col gap-y-2">
            {rooms.map((chat) => (
              <ChatItem key={chat._id} chat={chat} onClick={onselect} />
            ))}
          </List>
        </>
      )}
    </div>
  );
};
