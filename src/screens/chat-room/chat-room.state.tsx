import { useEffect, useState } from "react";
import type { IRoomMessage } from "../../context/chat-context/types";
import { useUserContext } from "../../context/user-context/use-user-context";
import { useChatContext } from "../../context/chat-context/use-chat-context";
import { getRoomMessages } from "./api/chat-room.api";
import { useNavigate, useParams } from "react-router-dom";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { useSocketContext } from "../../context/socket-context/use-socket-context";
import { SOCKET_EVENTS } from "../../constants-global/socket-routes";

export const useChatRoomState = () => {
  const navigate = useNavigate();

  const { chatId } = useParams<{ chatId: string }>();

  const { user } = useUserContext();

  const { isConnected, addMessageListener, removeMessageListener } =
    useSocketContext();
  const { getActiveRoom } = useChatContext();
  const [messages, setMessages] = useState<IRoomMessage[]>([]);

  const currentRoom = getActiveRoom(chatId || "");

  console.log(888888, messages);
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
    if (!user?._id) {
      navigate(SCREEN_ROUTES.USER_AUTH);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!isConnected) return;
    console.log(22222, chatId);
    const handleIncomingMessage = (data: unknown) => {
      console.log(3333, data);
      if ((data as IRoomMessage).chatRoomId === chatId) {
        setMessages((prev) => [...prev, data as IRoomMessage]);
      }
    };

    addMessageListener(SOCKET_EVENTS.CHAT_ROOM_MESSAGE, handleIncomingMessage);

    return () => {
      removeMessageListener(
        SOCKET_EVENTS.CHAT_ROOM_MESSAGE,
        handleIncomingMessage
      );
    };
  }, [addMessageListener, removeMessageListener, chatId, isConnected]);

  return {
    user,
    messages,
    currentRoom,
    setMessages,
  };
};
