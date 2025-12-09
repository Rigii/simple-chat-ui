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
  id: string;
  nickname: string;
  role: string;
}

export interface IRoomMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

export interface IChatRoom {
  id: string;
  name: string;
  updatedAt: string | Date;
  participants: IChatUser[];
  created: Date;
  updated: Date;
}

export interface IChatContext {
  rooms: IChatRoom[] | null;
  activeRoomId?: string | null;
  setActiveRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  setRoom: (room: IChatRoom) => void;
  setAllRooms: (rooms: IChatRoom[]) => void;
  addParticipantToRoom?: (roomId: string, participant: IChatUser) => void;
  removeParticipantFromRoom?: (roomId: string, userId: string) => void;
  getRoomById?: (roomId: string) => IChatRoom | undefined;
  clearAllRooms?: () => void;
}
