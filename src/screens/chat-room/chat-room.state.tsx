import { useEffect, useState } from "react";
import type { IRoomMessage } from "../../context/chat-context/types";
import { useUserContext } from "../../context/user-context/use-user-context";
import { useChatContext } from "../../context/chat-context/use-chat-context";
import { getRoomMessages } from "./api/chat-room.api";
import { useNavigate, useParams } from "react-router-dom";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";

export const useChatRoomState = () => {
  const navigate = useNavigate();

  const { chatId } = useParams<{ chatId: string }>();

  const { user } = useUserContext();
  const { getActiveRoom } = useChatContext();
  const [messages, setMessages] = useState<IRoomMessage[]>([]);

  const currentRoom = getActiveRoom(chatId || "");

  useEffect(() => {
    if (!user?._id || !currentRoom?._id) {
      return;
    }
    const fetchRoomMessages = async () => {
      const roomMessages = await getRoomMessages({
        chatRoomId: currentRoom._id,
        userId: user._id,
        chunkLimit: 40,
      });

      setMessages(roomMessages);
    };

    fetchRoomMessages();
  }, [user?._id, currentRoom?._id]);

  useEffect(() => {
    if (!user?.nickname) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  return {
    user,
    messages,
    currentRoom,
    setMessages,
  };
};
