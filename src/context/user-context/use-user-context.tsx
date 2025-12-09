import { useContext } from "react";
import { UserContext } from "./user-context";

export const useUserContext = () => {
  const context = useContext(UserContext);
  const { user, setUser, onLogoutUserData } = context || {};
  return { user, setUser, onLogoutUserData };
};
