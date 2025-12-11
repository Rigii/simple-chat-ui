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
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useUserContext();

  const { addSocketEventListener, removeSocketEventListener } =
    useSocketContext();

  useEffect(() => {
    const handleIncomingMessage = (data: IRoomMessage) => {
      if (data.chatRoomId !== chatId || data.participantId === user?._id) {
        return;
      }
      setMessages((prev) => [...prev, data]);
    };

    const handleRoomActiveInterlocutors = () => {};

    addSocketEventListener<IRoomMessage>(
      SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
      handleIncomingMessage
    );
    addSocketEventListener(
      SOCKET_EVENTS.ACTIVE_USERS,
      handleRoomActiveInterlocutors
    );

    return () => {
      removeSocketEventListener(
        SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
        handleRoomActiveInterlocutors
      );
    };
  }, [
    addSocketEventListener,
    removeSocketEventListener,
    setMessages,
    chatId,
    user?._id,
  ]);

  return;
};
