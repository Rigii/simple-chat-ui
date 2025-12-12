import type { ReactNode } from "react";
import { UserStateProvider } from "./user-context/user-sate-provider";
import { ChatStateProvider } from "./chat-context/chat-sate-provider";
import { SocketProvider } from "./socket-context/socket-context-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserStateProvider>
      <ChatStateProvider>
        <SocketProvider>{children}</SocketProvider>
      </ChatStateProvider>
    </UserStateProvider>
  );
}
