import { SCREEN_ROUTES } from "../../constants-global/screen-routes";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "../../context/socket-context/socket-context-provider";
import { ChatStateProvider } from "../../context/chat-context/chat-sate-provider";
import { SecurityRoute } from "../security-route";

export const ChatLayout = () => {
  return (
    <SocketProvider>
      <ChatStateProvider>
        <SecurityRoute
          component={<Outlet />}
          redirectRoute={SCREEN_ROUTES.USER_AUTH}
        />
      </ChatStateProvider>
    </SocketProvider>
  );
};
