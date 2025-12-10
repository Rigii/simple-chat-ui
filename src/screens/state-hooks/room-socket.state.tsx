import { useEffect } from "react";
import type { IRoomMessage } from "../../context/chat-context/types";
import { useSocketContext } from "../../context/socket-context/use-socket-context";
import { SOCKET_EVENTS } from "../../constants-global/socket-routes";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";

/* Used in component, while implementing the current room state update */
export const useChatRoomSocketListener = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<IRoomMessage[]>>;
}) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useUserContext();

  const { addMessageListener, removeMessageListener } = useSocketContext();

  useEffect(() => {
    const handleIncomingMessage = (data: IRoomMessage) => {
      console.log(111122223333, data);
      if (data.chatRoomId !== chatId || data.participantId === user?._id) {
        return;
      }
      setMessages((prev) => [...prev, data]);
    };

    addMessageListener(SOCKET_EVENTS.CHAT_ROOM_MESSAGE, handleIncomingMessage);

    return () => {
      removeMessageListener(
        SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
        handleIncomingMessage
      );
    };
  }, [
    addMessageListener,
    removeMessageListener,
    setMessages,
    chatId,
    user?._id,
  ]);

  return;
};
