export interface IChatUser {
  id: string;
  nickname: string;
  role: string;
}

export interface IChatRoom {
  id: string;
  name: string;
  updatedAt: string | Date;
  participants: IChatUser[];
}

export interface IChatListProps {
  items: IChatRoom[];
  onItemClick?: (chat: IChatRoom) => void;
  className?: string;
}
