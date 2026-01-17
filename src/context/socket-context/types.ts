import type { IChatRoom } from "../chat-context/types";

export interface ISocketContextType {
  isConnected: boolean;
  connectionSubscribe: (roomId: string) => Promise<{
    success: boolean;
    room: IChatRoom;
    activeParticipants: string[];
  }>;
  connectionUnsubscribe: (roomId: string) => Promise<{
    success: boolean;
    room?: IChatRoom | undefined;
  }>;
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

export interface IParticipantJoinedLeftRoomEvent {
  roomId: string;
  roomName: string;
  userPublicId: string;
  nickname: string;
}

export interface IParticipantJoinedLeftRoomEventData {
  message: string;
  data: IParticipantJoinedLeftRoomEvent;
}

export interface IChatRoomParticipantsEventData {
  roomId: string;
  roomName: string;
  users: string[];
}
