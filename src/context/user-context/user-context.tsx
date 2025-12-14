import { createContext } from "react";
import type { IUserContext } from "./types";

const defaultUserContext: IUserContext = {
  user: null,
  onSetUser: () => {},
  addRoomIdToLocalUserData: () => {},
};

export const UserContext = createContext<IUserContext>(defaultUserContext);
