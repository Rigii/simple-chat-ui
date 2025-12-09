import { Routes, Route, Navigate } from "react-router-dom";
// import { Navbar } from "flowbite-react";
import { ChatList } from "../screens/chat-list/chat-list";
import { SCREEN_ROUTES } from "../constants-global/screen-routes";
import { useUserContext } from "../context/user-context/use-user-context";
import { SafeRoute } from "./safe-route";
import SignUp from "../screens/user-data/user-data";

export const AppNavigation = () => {
  const { user } = useUserContext();

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path={SCREEN_ROUTES.USER_AUTH} element={<SignUp />} />
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
