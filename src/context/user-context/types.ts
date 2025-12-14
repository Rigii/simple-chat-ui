import type { IUserDataValues } from "../../screens/user-data/user-data.types";

export interface IUserContext {
  user: IUserDataValues | null;
  onSetUser: (userData: IUserDataValues) => void;
  addRoomIdToLocalUserData: (roomId: string) => void;
}
