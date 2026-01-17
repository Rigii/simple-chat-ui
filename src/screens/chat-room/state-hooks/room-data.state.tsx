import { useEffect, useState } from "react";
import type {
  IChatRoom,
  IRoomMessage,
} from "../../../context/chat-context/types";
import { useUserContext } from "../../../context/user-context/use-user-context";
import { getRoomDetails } from "../api/chat-room.api";
import { useNavigate, useParams } from "react-router-dom";
import { SCREEN_ROUTES } from "../../../constants-global/screen-routes";
import { useSocketContext } from "../../../context/socket-context/use-socket-context";

export const useChatRoomState = () => {
  const navigate = useNavigate();

  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useUserContext();
  const { isConnected, connectionSubscribe, connectionUnsubscribe } =
    useSocketContext();

  const [activeRoomCached, setActiveRoom] = useState<IChatRoom | null>(null);
  const [messages, setMessages] = useState<IRoomMessage[]>([]);
  const [onlineParticipants, setOnlineParticipants] = useState<string[]>();

  useEffect(() => {
    const roomSocketSubscribe = async (roomId: string) => {
      try {
        const { room, activeParticipants } = await connectionSubscribe(roomId);
        if (!user || !isConnected) return;

        setActiveRoom(room || null);

        const usersSet = new Set([...activeParticipants, user.public_id]);
        setOnlineParticipants(Array.from(usersSet));
      } catch (error) {
        console.error(error);
      }
    };

    (async () => {
      if (!user?._id || !activeRoomCached?._id) {
        await roomSocketSubscribe(chatId || "");
        return;
      }

      /* DTODO: Rename to getRoomMessages */
      const { messages } = await getRoomDetails({
        chatRoomId: activeRoomCached._id,
        userId: user._id,
        chunkLimit: 200,
      });

      setMessages(messages);
    })();

    return () => {
      connectionUnsubscribe(chatId || "");
    };
  }, [
    isConnected,
    user?._id,
    user?.public_id,
    activeRoomCached?._id,
    chatId,
    connectionSubscribe,
    connectionUnsubscribe,
  ]);

  useEffect(() => {
    if (!user?._id) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  return {
    user,
    messages,
    activeRoomCached,
    onlineParticipants,
    setMessages,
    setOnlineParticipants,
  };
};
