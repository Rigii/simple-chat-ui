import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useUserContext } from "../user-context/use-user-context";
import { API_ROUTES } from "../../constants-global/api-routes";
import {
  CHAT_NAMESPACES,
  SOCKET_EVENTS,
} from "../../constants-global/socket-routes";
import type { ISocketProviderProps } from "./types";
import { SocketContext } from "./socket-context";
import { strings } from "./strings";
import type { IChatRoom } from "../chat-context/types";

export const SocketProvider = ({ children }: ISocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user?._id) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socket = io(`${API_ROUTES.BASE_URL}/${CHAT_NAMESPACES.CHAT_ROOM}`, {
      query: {
        userId: user._id,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log(strings.socketConnected, socket.id);
      setIsConnected(true);
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
      console.error(strings.socketConnectionError, error);
      setIsConnected(false);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log(strings.socketDisconnected, reason);
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  const connectionSubscribe = (
    roomId: string
  ): Promise<{ success: boolean; room?: IChatRoom }> =>
    new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }
      console.log(1111);
      socketRef.current.emit(
        SOCKET_EVENTS.SUBSCRIBE_ROOM,
        roomId,
        (response: { success: boolean; room?: IChatRoom }) => {
          if (response.success) {
            console.log(`${strings.joinedRoom} ${roomId}`);
            resolve(response);
          } else {
            console.error(`Failed to join room ${roomId}`);
            reject(new Error(`Failed to join room ${roomId}`));
          }
        }
      );
    });

  const connectionUnsubscribe = (
    roomId: string
  ): Promise<{ success: boolean; room?: IChatRoom }> =>
    new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error(strings.socketNotConnected));
        return;
      }
      console.log(2222);

      socketRef.current.emit(SOCKET_EVENTS.UNSUBSCRIBE_ROOM, roomId);
    });

  const sendMessage = (roomId: string, message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(SOCKET_EVENTS.CHAT_ROOM_MESSAGE, {
        chatRoomId: roomId,
        participantId: user?._id,
        nickname: user?.nickname,
        message,
      });
    }
  };

  const addSocketEventListener = useCallback(
    <T,>(event: string, handler: (data: T) => void) => {
      socketRef?.current?.on(event, handler);
    },
    [socketRef]
  );

  const removeSocketEventListener = useCallback(
    <T,>(event: string, handler: (data: T) => void) => {
      socketRef?.current?.off(event, handler);
    },
    [socketRef]
  );

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  };

  const value = {
    isConnected,
    connectionSubscribe,
    connectionUnsubscribe,
    sendMessage,
    addSocketEventListener,
    removeSocketEventListener,
    disconnect,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
