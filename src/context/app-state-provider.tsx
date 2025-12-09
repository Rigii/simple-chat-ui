import type { ReactNode } from "react";
import { UserStateProvider } from "./user-context/user-sate-provider";
import { ChatStateProvider } from "./chat-context/chat-sate-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return [UserStateProvider, ChatStateProvider].reduce((wrapped, Provider) => {
    return <Provider>{wrapped}</Provider>;
  }, children);
}
