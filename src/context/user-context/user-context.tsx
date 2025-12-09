import { createContext } from "react";
import type { IUserContext } from "./types";

const defaultUserContext: IUserContext = {
  user: null,
  setUser: () => {},
  onLogoutUserData: () => {},
};

export const UserContext = createContext<IUserContext>(defaultUserContext);
