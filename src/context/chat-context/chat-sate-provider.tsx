import { useState, useEffect, type ReactNode } from "react";
import { ChatContext } from "./chat-context";
import type { IChatRoom } from "./types";
import { getAllChats } from "../../screens/chat-list/chat-list.api";
import { useUserContext } from "../user-context/use-user-context";
import { joinChatRoomAPI } from "../../screens/chat-room/api/chat-room.api";
import { strings } from "../../screens/chat-list/strings";

export const ChatStateProvider = ({ children }: { children: ReactNode }) => {
  const { user, addRoomIdToLocalUserData } = useUserContext();

  const [rooms, setRooms] = useState<IChatRoom[]>([]);
  const [userJoinedRooms, setUserJoinedRooms] = useState<IChatRoom[]>([]);

  const joinRoom = async (roomId: string) => {
    try {
      if (!user?._id) return;

      const { currentRoomData } = await joinChatRoomAPI({
        roomId: roomId,
        userId: user._id,
      });

      removeRoomFromUnsubscribedList(currentRoomData);

      setUserJoinedRooms((joinedRooms) => [...joinedRooms, currentRoomData]);

      addRoomIdToLocalUserData(roomId);
    } catch (error) {
      console.error(strings.errorJoiningRoom, error);
    }
  };

  const removeRoomFromUnsubscribedList = (currentRoomData: IChatRoom) => {
    setRooms((prevRooms) => {
      if (!prevRooms) return prevRooms;
      return prevRooms.filter((room) => room._id !== currentRoomData?._id);
    });
  };

  const clearAllRooms = () => {
    setUserJoinedRooms([]);
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
        userJoinedRooms,
        joinRoom,
        clearAllRooms,
        getRoomById,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
