import { createContext } from "react";
import type { IChatContext } from "./types";

export const ChatContext = createContext<IChatContext | undefined>(undefined);
