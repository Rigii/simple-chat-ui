import { useParams, useNavigate } from "react-router-dom";
import { useChatContext } from "../../../context/chat-context/use-chat-context";
import { SCREEN_ROUTES } from "../../../constants-global/screen-routes";
import { HiBackspace } from "react-icons/hi";
import { Button, Card } from "flowbite-react";

import { strings } from "../strings";
import type { IRoomMessage } from "../../../context/chat-context/types";

interface ChatRoomDetailProps {
  messages: IRoomMessage[];
  onlineParticipants: string[] | undefined;
}

export const ChatRoomDetail: React.FC<ChatRoomDetailProps> = ({
  messages,
  onlineParticipants,
}) => {
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
    <Card className="mb-2 py-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{chatRoom.chat_name}</h3>
        <div className="flex flex-row gap-5 items-center">
          <span className="text-sm text-gray-500">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </span>
          <span className="text-sm text-gray-500">
            {`${strings.participiants} ${onlineParticipants?.length}/${chatRoom.participants.length}`}
          </span>
          <span className="text-sm text-gray-500">
            {strings.created}:{" "}
            {new Date(chatRoom.created).toLocaleTimeString([], {
              year: "2-digit",
              month: "2-digit",
            })}
          </span>
          <Button
            onClick={() => navigate(SCREEN_ROUTES.CHAT_LIST)}
            className="px-4 border"
          >
            <HiBackspace className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
