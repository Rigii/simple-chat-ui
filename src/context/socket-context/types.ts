export interface ISocketContextType {
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (
    roomId: string,
    message: string,
    additionalData?: object | undefined
  ) => void;
  addMessageListener: (event: string, handler: (data: unknown) => void) => void;
  removeMessageListener: (
    event: string,
    handler: (data: unknown) => void
  ) => void;
  disconnect: () => void;
}

export interface ISocketProviderProps {
  children: React.ReactNode;
}
