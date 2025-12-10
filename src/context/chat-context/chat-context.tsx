import { createContext } from "react";
import type { IChatContext } from "./types";

const defaultChatContext: IChatContext = {
  rooms: null,
  activeRoomId: null,
  setActiveRoomId: () => {},
  setRoom: () => {},
  setAllRooms: () => {},
  addParticipantToRoom: () => {},
  removeParticipantFromRoom: () => {},
  getRoomById: () => undefined,
  clearAllRooms: () => {},
  getActiveRoom: () => undefined,
};

export const ChatContext = createContext<IChatContext>(defaultChatContext);
