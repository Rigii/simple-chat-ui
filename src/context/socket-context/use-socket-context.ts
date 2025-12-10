import { useContext } from "react";
import { SocketContext } from "./socket-context";

export const SocketStateProvider = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("SocketStateProvider must be used within SocketProvider");
  }
  return context;
};
