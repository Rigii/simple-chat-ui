import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import UserData from "./screens/user-data/user-data";
import { Navbar } from "flowbite-react";
import ChatList from "./screens/chat-list/chat-list";
import { SCREEN_ROUTES } from "./constants-global/screen-routes";
import { useUserContext } from "./context/user-context/use-user-context";

function App() {
  const { user } = useUserContext();
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path={SCREEN_ROUTES.USER_AUTH}
          element={
            user?.email && user?.nickname ? (
              <Navigate
                to={SCREEN_ROUTES.CHAT_LIST}
                replace
                state={{ from: location }}
              />
            ) : (
              <UserData />
            )
          }
        />

        <Route
          path={SCREEN_ROUTES.CHAT_LIST}
          element={
            user?.email && user?.nickname ? (
              <ChatList />
            ) : (
              <Navigate
                to={SCREEN_ROUTES.USER_AUTH}
                replace
                state={{ from: location }}
              />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                user?.email && user?.nickname
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
}

export default App;
