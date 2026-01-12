import { useEffect } from "react";
import type { IRoomMessage } from "../../../context/chat-context/types";
import { useSocketContext } from "../../../context/socket-context/use-socket-context";
import { SOCKET_EVENTS } from "../../../constants-global/socket-routes";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/user-context/use-user-context";
import type { IParticipantJoinedLeftRoomEventData } from "../../../context/socket-context/types";

export const useChatRoomSocketListener = ({
  setMessages,
  setOnlineParticipants,
}: {
  setMessages: React.Dispatch<React.SetStateAction<IRoomMessage[]>>;
  setOnlineParticipants: React.Dispatch<
    React.SetStateAction<string[] | undefined>
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
      eventData: IParticipantJoinedLeftRoomEventData
    ) => {
      const { data } = eventData;
      console.log(1111, "JOINED", data.userId);

      setOnlineParticipants((current) => {
        if (!current) return;
        if (!current?.includes(data?.userId)) {
          return [...current, data?.userId];
        }
        return current;
      });
    };

    const handleParticipantLeftRoom = (
      eventData: IParticipantJoinedLeftRoomEventData
    ) => {
      const { data } = eventData;
      setOnlineParticipants((current) => {
        if (!current) return [];
        console.log(22222, "LEFT", data.userId);
        return current.filter((id) => id !== data.userId);
      });
    };

    addSocketEventListener<IRoomMessage>(
      SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
      handleIncomingMessage
    );

    addSocketEventListener<IParticipantJoinedLeftRoomEventData>(
      SOCKET_EVENTS.PARTICIPANT_JOINED_CHAT_APP,
      handleParticipantJoinedRoom
    );

    addSocketEventListener<IParticipantJoinedLeftRoomEventData>(
      SOCKET_EVENTS.PARTICIPANT_LEFT_CHAT_APP,
      handleParticipantLeftRoom
    );

    return () => {
      removeSocketEventListener<IRoomMessage>(
        SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
        handleIncomingMessage
      );
      removeSocketEventListener<IParticipantJoinedLeftRoomEventData>(
        SOCKET_EVENTS.PARTICIPANT_JOINED_CHAT_APP,
        handleParticipantJoinedRoom
      );

      removeSocketEventListener<IParticipantJoinedLeftRoomEventData>(
        SOCKET_EVENTS.PARTICIPANT_LEFT_CHAT_APP,
        handleParticipantLeftRoom
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
