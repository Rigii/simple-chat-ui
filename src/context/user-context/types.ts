import type { IUserDataValues } from "../../screens/user-data/user-data.types";

export interface IUserContext {
  user: IUserDataValues | null;
  setUser: (userData: IUserDataValues) => void;
  onLogoutUserData: () => void;
}
