export interface IPostRoomMessageDto {
  chatRoomId: string;
  message: string;
  participantId: string;
  nickname: string;
}

export interface IGetRoomMessagesDto {
  chatRoomId: string;
  userId: string;
  chunkLimit?: number;
}

export interface IChatUser {
  _id: string;
  nickname: string;
  role: string;
}

export interface IRoomMessage {
  _id: string;
  chatRoomId: string;
  participantId: string;

  nickname: string;
  message: string;
  created?: string;
  updated?: string;
}

export interface IRoomDetails {
  messages: IRoomMessage[];
  activeParticipants: string[];
}

export interface IChatRoom {
  _id: string;
  chat_name: string;
  participants: IChatUser[];
  created: Date;
  updated: Date;
}

export interface IChatContext {
  rooms: IChatRoom[] | [];
  userJoinedRooms: IChatRoom[] | [];
  activeRoomId?: string | null;
  setActiveRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  getActiveRoom: (roomId: string) => IChatRoom | undefined;
  removeParticipantFromRoom?: (roomId: string, userId: string) => void;
  getRoomById: (roomId: string) => IChatRoom | undefined;
  clearAllRooms?: () => void;
  joinRoom: (roomId: string) => Promise<void>;
}
