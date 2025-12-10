import { useParams, useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/chat-context/use-chat-context";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { HiBackspace } from "react-icons/hi";
import { Button } from "flowbite-react";

import { strings } from "./strings";

export const ChatRoomDetail: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { getRoomById } = useChatContext();

  const chatRoom = getRoomById(chatId || "");

  if (!chatRoom) {
    return (
      <div className="p-4">
        <h2>{strings.chatNotFound}</h2>

        <Button
          onClick={() => navigate(SCREEN_ROUTES.CHAT_LIST)}
          color="blue"
          className="px-4"
        >
          <HiBackspace className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row p-4 justify-between">
      <h1 className="text-2xl font-bold">{chatRoom.chat_name}</h1>

      <div className="flex flex-row">
        <div className="p-4">
          <h3 className="font-semibold mb-2">Participants:</h3>
          {`${chatRoom.participants.length}/${chatRoom.participants.length}`}
        </div>

        <div className="mt-6">
          <p className="text-gray-500 text-sm">
            {strings.created}: {new Date(chatRoom.created).toLocaleDateString()}
          </p>
        </div>
        <Button
          onClick={() => navigate(SCREEN_ROUTES.CHAT_LIST)}
          className="px-4 border"
        >
          <HiBackspace className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
