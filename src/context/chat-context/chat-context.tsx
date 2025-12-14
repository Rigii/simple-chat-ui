import { createContext } from "react";
import type { IChatContext } from "./types";

const defaultChatContext: IChatContext = {
  rooms: [],
  activeRoomId: null,
  userJoinedRooms: [],
  setActiveRoomId: () => {},
  removeParticipantFromRoom: () => {},
  getRoomById: () => undefined,
  clearAllRooms: () => {},
  getActiveRoom: () => undefined,
  joinRoom: async () => {},
};

export const ChatContext = createContext<IChatContext>(defaultChatContext);
