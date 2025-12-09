import type { IChatRoom } from "../../context/chat-context/types";

export interface IChatListProps {
  items: IChatRoom[];
  onItemClick?: (chat: IChatRoom) => void;
  className?: string;
}
