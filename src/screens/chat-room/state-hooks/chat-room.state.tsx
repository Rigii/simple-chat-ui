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
  const { getActiveRoom, addParticipantToRoom } = useChatContext();
  const [messages, setMessages] = useState<IRoomMessage[]>([]);
  const [onlineParticipants, setOnlineParticipants] = useState<string[]>();

  const currentRoom = getActiveRoom(chatId || "");

  useEffect(() => {
    if (!user?._id || !currentRoom?._id) {
      return;
    }
    (async () => {
      const { messages, roomData, activeParticipants } = await getRoomDetails({
        chatRoomId: currentRoom._id,
        userId: user._id,
        chunkLimit: 200,
      });

      setMessages(messages);
      setOnlineParticipants(activeParticipants);

      roomData.participants.forEach((participiantId) => {
        addParticipantToRoom(roomData._id, participiantId);
      });
    })();
  }, [user?._id, currentRoom?._id, addParticipantToRoom]);

  useEffect(() => {
    if (!user?._id) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  return {
    user,
    messages,
    currentRoom,
    onlineParticipants,
    setMessages,
    setOnlineParticipants,
  };
};
