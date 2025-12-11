import { useEffect } from "react";
import type { IRoomMessage } from "../../context/chat-context/types";
import { useSocketContext } from "../../context/socket-context/use-socket-context";
import { SOCKET_EVENTS } from "../../constants-global/socket-routes";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/user-context/use-user-context";
import type {
  IChatRoomParticipantsEventData,
  IParticipantJoinedLeftRoomEventData,
} from "../../context/socket-context/types";

/* Used in component, while implementing the current room state update */
export const useChatRoomSocketListener = ({
  setMessages,
  setOnlineParticipants,
}: {
  setMessages: React.Dispatch<React.SetStateAction<IRoomMessage[]>>;
  setOnlineParticipants: React.Dispatch<
    React.SetStateAction<IChatRoomParticipantsEventData | undefined>
  >;
}) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useUserContext();

  const { isConnected, addSocketEventListener, removeSocketEventListener } =
    useSocketContext();

  useEffect(() => {
    if (!isConnected || !chatId) {
      return;
    }
    const handleIncomingMessage = (data: IRoomMessage) => {
      if (data.chatRoomId !== chatId || data.participantId === user?._id) {
        return;
      }
      setMessages((prev) => [...prev, data]);
    };

    const handleParticipantJoinedRoom = (
      data: IParticipantJoinedLeftRoomEventData
    ) => {
      console.log(8888888, data);
    };

    addSocketEventListener<IRoomMessage>(
      SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
      handleIncomingMessage
    );

    addSocketEventListener<IParticipantJoinedLeftRoomEventData>(
      SOCKET_EVENTS.PARTICIPANT_JOINED_ROOM,
      handleParticipantJoinedRoom
    );

    return () => {
      removeSocketEventListener<IRoomMessage>(
        SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
        handleIncomingMessage
      );
      removeSocketEventListener<IParticipantJoinedLeftRoomEventData>(
        SOCKET_EVENTS.PARTICIPANT_JOINED_ROOM,
        handleParticipantJoinedRoom
      );
    };
  }, [
    isConnected,
    chatId,
    user?._id,
    addSocketEventListener,
    removeSocketEventListener,
    setMessages,
    setOnlineParticipants,
  ]);

  return;
};
