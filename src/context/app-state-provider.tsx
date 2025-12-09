import type { ReactNode } from "react";
import { UserStateProvider } from "./user-context/user-sate-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return [UserStateProvider].reduce((wrapped, Provider) => {
    return <Provider>{wrapped}</Provider>;
  }, children);
}
