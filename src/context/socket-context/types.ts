import type { IRoomMessage } from "../chat-context/types";

export interface ISocketContextType {
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (
    roomId: string,
    message: string,
    additionalData?: object | undefined
  ) => void;
  addSocketEventListener: <T>(
    event: string,
    handler: (data: T) => void
  ) => void;
  removeSocketEventListener: <T>(
    event: string,
    handler: (data: T) => void
  ) => void;
  disconnect: () => void;
}

export interface ISocketProviderProps {
  children: React.ReactNode;
}

export interface ISocketEvents {
  "room:message": IRoomMessage;
  "user:typing": { roomId: string; userId: string };
  "server:ping": number;
}
