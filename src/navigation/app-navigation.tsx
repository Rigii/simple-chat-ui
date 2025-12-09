import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "flowbite-react";
import ChatList from "../screens/chat-list/chat-list";
import { SCREEN_ROUTES } from "../constants-global/screen-routes";
import { useUserContext } from "../context/user-context/use-user-context";
import { SafeRoute } from "./safe-route";

export const AppNavigation = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path={SCREEN_ROUTES.USER_AUTH}
          element={
            <Navigate
              to={SCREEN_ROUTES.CHAT_LIST}
              replace
              state={{ from: location }}
            />
          }
        />
        <Route
          path={SCREEN_ROUTES.CHAT_LIST}
          element={
            <SafeRoute
              userData={user}
              component={<ChatList />}
              redirectRoute={SCREEN_ROUTES.USER_AUTH}
            />
          }
        />
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
