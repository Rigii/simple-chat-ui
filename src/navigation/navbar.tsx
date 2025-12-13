import { useUserContext } from "../context/user-context/use-user-context";
import { Button, Navbar } from "flowbite-react";
import { HiBackspace } from "react-icons/hi";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { SCREEN_ROUTES } from "../constants-global/screen-routes";

export const AppNavbar = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const chatMatch = matchPath(
    `${SCREEN_ROUTES.CHAT_LIST}/:chatId`,
    location.pathname
  );
  const chatId = chatMatch?.params.chatId;

  if (location?.pathname === SCREEN_ROUTES.USER_AUTH || !!chatId) {
    return;
  }

  const logout = () => {
    localStorage.clear();
    navigate(SCREEN_ROUTES.USER_AUTH);
  };

  return (
    <Navbar>
      <div className="flex flex-row justify-between items-center w-full">
        <div>{user?.nickname}</div>
        <Button onClick={logout} className="px-4 border">
          <HiBackspace className="h-5 w-5" />
        </Button>
      </div>
    </Navbar>
  );
};
