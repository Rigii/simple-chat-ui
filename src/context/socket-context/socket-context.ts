import { createContext } from "react";
import type { ISocketContextType } from "./types";

export const SocketContext = createContext<ISocketContextType | undefined>(
  undefined
);
