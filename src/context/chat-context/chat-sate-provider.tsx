import { useState, useEffect, type ReactNode } from "react";
import { ChatContext } from "./chat-context";
import type { IChatRoom } from "./types";
import { getAllChats } from "../../screens/chat-list/chat-list.api";
import { useUserContext } from "../user-context/use-user-context";
import { joinChatRoomsAPI } from "../../screens/chat-room/api/chat-room.api";
import { LOCAL_STORAGE_NAMESPACES } from "../../constants-global/storage-namespaces";
import { strings } from "../../screens/chat-list/strings";

export const ChatStateProvider = ({ children }: { children: ReactNode }) => {
  const { user, addRoomIdToLocalUserData } = useUserContext();

  const chatLocalStorageStore = (rooms: IChatRoom[] | null) => {
    localStorage.setItem(
      LOCAL_STORAGE_NAMESPACES.userJoinedChatRooms,
      JSON.stringify(rooms)
    );
  };

  const roomsLocalStorageRetrieve = (name: string): IChatRoom[] | null => {
    const stored = localStorage.getItem(name);
    return stored ? JSON.parse(stored) : null;
  };

  const [rooms, setRooms] = useState<IChatRoom[]>([]);
  const [userJoinedRooms, setUserJoinedRooms] = useState<IChatRoom[]>(() => {
    const storedRooms =
      roomsLocalStorageRetrieve(LOCAL_STORAGE_NAMESPACES.userJoinedChatRooms) ||
      [];
    return storedRooms;
  });
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (userJoinedRooms !== null) {
      chatLocalStorageStore(userJoinedRooms);
    }
  }, [userJoinedRooms]);

  const joinRoom = async (roomId: string) => {
    try {
      if (!user?._id) return;

      const { currentRoomData } = await joinChatRoomsAPI({
        roomId: roomId,
        userId: user._id,
      });

      removeRoomFromAvailableList(currentRoomData);

      setUserJoinedRooms((joinedRooms) => [...joinedRooms, currentRoomData]);

      addRoomIdToLocalUserData(roomId);
    } catch (error) {
      console.error(strings.errorJoiningRoom, error);
    }
  };

  const removeRoomFromAvailableList = (currentRoomData: IChatRoom) => {
    setRooms((prevRooms) => {
      if (!prevRooms) return prevRooms;
      return prevRooms.filter((room) => room._id !== currentRoomData?._id);
    });
  };

  const getActiveRoom = (roomId: string): IChatRoom | undefined => {
    return userJoinedRooms?.find((room) => room._id === roomId);
  };

  const clearAllRooms = () => {
    setUserJoinedRooms([]);
    localStorage.removeItem(LOCAL_STORAGE_NAMESPACES.userJoinedChatRooms);
  };

  const getRoomById = (roomId: string): IChatRoom | undefined => {
    return userJoinedRooms?.find((room) => room._id === roomId);
  };

  useEffect(() => {
    if (!user?._id) return;

    const getInitialChatRooms = async (participantId: string) => {
      try {
        const { availableRooms, interlocutorRooms } = await getAllChats({
          participantId,
        });
        const noUserRoomsAvailable = availableRooms.filter(
          (availableRoom) =>
            !interlocutorRooms.some(
              (userRoom) => userRoom._id === availableRoom._id
            )
        );

        setRooms(noUserRoomsAvailable);
        setUserJoinedRooms(interlocutorRooms);
      } catch (error) {
        console.error(strings.errorFetchingChatRooms, error);
      }
    };

    getInitialChatRooms(user?._id);
  }, [user?._id]);

  return (
    <ChatContext.Provider
      value={{
        rooms,
        activeRoomId,
        userJoinedRooms,
        joinRoom,
        setActiveRoomId,
        getActiveRoom,
        clearAllRooms,
        getRoomById,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
