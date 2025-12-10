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
  addMessageListener: (
    event: string,
    handler: (data: IRoomMessage) => void
  ) => void;
  removeMessageListener: (
    event: string,
    handler: (data: IRoomMessage) => void
  ) => void;
  disconnect: () => void;
}

export interface ISocketProviderProps {
  children: React.ReactNode;
}
