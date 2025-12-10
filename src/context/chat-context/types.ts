export interface IPostRoomMessageDto {
  chatRoomId: string;
  message: string;
  senderId: string;
  senderName: string;
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
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

export interface IChatRoom {
  _id: string;
  chat_name: string;
  participants: IChatUser[];
  created: Date;
  updated: Date;
}

export interface IChatContext {
  rooms: IChatRoom[] | null;
  activeRoomId?: string | null;
  setActiveRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  getActiveRoom: (roomId: string) => IChatRoom | undefined;
  setRoom: (room: IChatRoom) => void;
  setAllRooms: (rooms: IChatRoom[]) => void;
  addParticipantToRoom?: (roomId: string, participant: IChatUser) => void;
  removeParticipantFromRoom?: (roomId: string, userId: string) => void;
  getRoomById: (roomId: string) => IChatRoom | undefined;
  clearAllRooms?: () => void;
}
