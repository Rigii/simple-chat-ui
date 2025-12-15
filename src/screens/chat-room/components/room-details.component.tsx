import { useParams, useNavigate } from "react-router-dom";
import { useChatContext } from "../../../context/chat-context/use-chat-context";
import { SCREEN_ROUTES } from "../../../constants-global/screen-routes";
import { HiBackspace } from "react-icons/hi";
import { Button, Card } from "flowbite-react";

import { strings } from "../strings";
import type { IRoomMessage } from "../../../context/chat-context/types";

interface ChatRoomDetailsProps {
  messages: IRoomMessage[];
  onlineParticipants: string[] | undefined;
}

export const ChatRoomDetails: React.FC<ChatRoomDetailsProps> = ({
  messages,
  onlineParticipants,
}) => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { getRoomById } = useChatContext();
  const chatRoom = getRoomById(chatId || "");
  const navigateToChatList = () => navigate(SCREEN_ROUTES.CHAT_LIST);

  if (!chatRoom) {
    return (
      <div className="p-4">
        <h2>{strings.chatNotFound}</h2>

        <Button onClick={navigateToChatList} color="blue" className="px-4">
          <HiBackspace className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-0 border-r-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
          <Button
            onClick={navigateToChatList}
            className="px-3 sm:hidden border"
            size="sm"
          >
            <HiBackspace className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold truncate flex-1">
            {chatRoom.chat_name}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 sm:items-center w-full sm:w-auto">
          <div className="flex justify-between sm:justify-start items-center">
            <span className="text-sm text-gray-500 sm:hidden">
              {strings.messages}:
            </span>
            <span className="text-sm text-gray-500">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex justify-between sm:justify-start items-center">
            <span className="text-sm text-gray-500 sm:hidden">
              {strings.participiants}:
            </span>
            <span className="text-sm text-gray-500">
              {onlineParticipants?.length}/{chatRoom.participants.length}
            </span>
          </div>

          <div className="flex justify-between sm:justify-start items-center">
            <span className="text-sm text-gray-500 sm:hidden">
              {strings.created}:
            </span>
            <span className="text-sm text-gray-500 truncate">
              {new Date(chatRoom.created).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <Button
            onClick={navigateToChatList}
            className="px-4 border hidden sm:flex"
          >
            <HiBackspace className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
