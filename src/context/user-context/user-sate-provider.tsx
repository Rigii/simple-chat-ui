import { useState, type ReactNode } from "react";
import { UserContext } from "./user-context";
import type { IUserDataValues } from "../../screens/user-data/user-data.types";

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const userLocalStorageStore = (userData: IUserDataValues | null) =>
    localStorage.setItem("userData", JSON.stringify(userData));
  const userLocalStorageRetrieve = localStorage.getItem("userData");

  const [user, setUser] = useState<IUserDataValues | null>(
    userLocalStorageRetrieve
      ? JSON.parse(userLocalStorageRetrieve)
      : { email: "", nickname: "", rooms: [], role: "user", _id: "" }
  );

  const onSetUser = (userData: IUserDataValues) => {
    setUser(userData);
    userLocalStorageStore(userData);
  };

  const addRoomIdToLocalUserData = (roomId: string) => {
    setUser((currentUser) => {
      if (!currentUser || currentUser?.rooms?.includes(roomId))
        return currentUser;

      const updatedUserData = {
        ...currentUser,
        rooms: [...currentUser.rooms, roomId],
      };
      userLocalStorageStore(updatedUserData);
      return updatedUserData;
    });
  };

  return (
    <UserContext.Provider value={{ user, onSetUser, addRoomIdToLocalUserData }}>
      {children}
    </UserContext.Provider>
  );
};
