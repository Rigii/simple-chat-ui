import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useUserContext } from "../user-context/use-user-context";
import { API_ROUTES } from "../../constants-global/api-routes";
import {
  CHAT_NAMESPACES,
  CHAT_ROOM_EMIT_EVENTS,
} from "../../constants-global/socket-routes";
import type { ISocketProviderProps } from "./types";
import { SocketContext } from "./socket-context";

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

    // Initialize socket connection
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

    // Connection events
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  const joinRoom = useCallback((roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("join-room", roomId);
      console.log(`Joined room: ${roomId}`);
    }
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("leave-room", roomId);
      console.log(`Left room: ${roomId}`);
    }
  }, []);

  const sendMessage = useCallback(
    (roomId: string, message: string, additionalData?: object) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit(CHAT_ROOM_EMIT_EVENTS.CHAT_ROOM_MESSAGE, {
          roomId,
          message,
          ...additionalData,
        });
      }
    },
    [isConnected]
  );

  const addMessageListener = useCallback(
    (event: string, handler: (data: unknown) => void) => {
      if (socketRef.current) {
        socketRef.current.on(event, handler);
      }
    },
    []
  );

  const removeMessageListener = useCallback(
    (event: string, handler: (data: unknown) => void) => {
      if (socketRef.current) {
        socketRef.current.off(event, handler);
      }
    },
    []
  );

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const value = {
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
    addMessageListener,
    removeMessageListener,
    disconnect,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
