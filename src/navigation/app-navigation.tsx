import { Routes, Route, Navigate } from "react-router-dom";
import { ChatList } from "../screens/chat-list/chat-list.screen";
import { SCREEN_ROUTES } from "../constants-global/screen-routes";
import { useUserContext } from "../context/user-context/use-user-context";
import SignUp from "../screens/user-data/user-data.screen";
import { ChatRoom } from "../screens/chat-room/chat-room.screen";
import { AppNavbar } from "./navbar";
import { ChatLayout } from "./layouts/chat-layout";

export const AppNavigation = () => {
  const { user } = useUserContext();

  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path={SCREEN_ROUTES.USER_AUTH} element={<SignUp />} />
        <Route path={SCREEN_ROUTES.CHAT_LIST} element={<ChatLayout />}>
          <Route index element={<ChatList />} />
          <Route path=":chatId" element={<ChatRoom />} />
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to={
                user?.nickname
                  ? SCREEN_ROUTES.CHAT_LIST
                  : SCREEN_ROUTES.USER_AUTH
              }
              replace
            />
          }
        />
      </Routes>
    </div>
  );
};
