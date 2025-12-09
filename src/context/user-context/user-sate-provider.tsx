import { useState, type ReactNode } from "react";
import { UserContext } from "./user-context";
import type { IUserDataValues } from "../../screens/user-data/user-data.types";

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const userLocalStorageStore = (userData: IUserDataValues | null) =>
    localStorage.setItem("userData", JSON.stringify(userData));
  const userLocalStorageRetrieve = localStorage.getItem("userData");

  const [user, setUser] = useState<IUserDataValues | null>(
    userLocalStorageRetrieve ? JSON.parse(userLocalStorageRetrieve) : null
  );

  const onSetUser = (userData: IUserDataValues) => {
    const hashedPassword = btoa(userData.password);
    userData.password = hashedPassword;
    setUser(userData);
    userLocalStorageStore(userData);
  };

  const onLogoutUserData = () => {
    const updatedUserData = {
      ...user,
      outlookCalendar: {},
      zoho: {},
    } as unknown as IUserDataValues;

    onSetUser(updatedUserData);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: onSetUser, onLogoutUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
