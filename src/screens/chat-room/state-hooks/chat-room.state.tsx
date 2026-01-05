import { useEffect, useState } from "react";
import type { IRoomMessage } from "../../../context/chat-context/types";
import { useUserContext } from "../../../context/user-context/use-user-context";
import { useChatContext } from "../../../context/chat-context/use-chat-context";
import { getRoomDetails } from "../api/chat-room.api";
import { useNavigate, useParams } from "react-router-dom";
import { SCREEN_ROUTES } from "../../../constants-global/screen-routes";

export const useChatRoomState = () => {
  const navigate = useNavigate();

  const { chatId } = useParams<{ chatId: string }>();

  const { user } = useUserContext();
  const { addParticipantToRoom, roomSubscribe, activeRoomCached } =
    useChatContext();

  const [messages, setMessages] = useState<IRoomMessage[]>([]);
  const [onlineParticipants, setOnlineParticipants] = useState<string[]>();

  const subscribeGetRoomDetails = async () => {
    if (activeRoomCached?._id) {
      return;
    }
    await roomSubscribe(chatId || "");
  };

  useEffect(() => {
    if (!user?._id || !activeRoomCached?._id) {
      subscribeGetRoomDetails();
      return;
    }
    (async () => {
      const { messages, roomData, activeParticipants } = await getRoomDetails({
        chatRoomId: activeRoomCached._id,
        userId: user._id,
        chunkLimit: 200,
      });

      setMessages(messages);
      setOnlineParticipants(activeParticipants);

      roomData.participants.forEach((participiantId) => {
        addParticipantToRoom(roomData._id, participiantId);
      });
    })();
  }, [user?._id, activeRoomCached?._id, addParticipantToRoom]);

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
