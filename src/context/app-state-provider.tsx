import type { ReactNode } from "react";
import { UserStateProvider } from "./user-context/user-sate-provider";
import { BrowserRouter } from "react-router-dom";

export function AppContextProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <UserStateProvider>{children}</UserStateProvider>
    </BrowserRouter>
  );
}
