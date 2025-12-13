import { useState, useEffect, type ReactNode } from "react";
import { ChatContext } from "./chat-context";
import type { IChatRoom, IChatUser } from "./types";
import { getAllChats } from "../../screens/chat-list/chat-list.api";
import { useUserContext } from "../user-context/use-user-context";
import { joinChatRoomsAPI } from "../../screens/chat-room/api/chat-room.api";
import { LOCAL_STORAGE_NAMESPACES } from "../../constants-global/storage-namespaces";
import { strings } from "../../screens/chat-list/strings";

export const ChatStateProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();

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

      await joinChatRoomsAPI({ roomId: roomId, userId: user._id });

      setRooms((prevRooms) => {
        if (!prevRooms) return prevRooms;
        return prevRooms.filter((room) => room._id !== roomId);
      });

      setUserJoinedRooms((prevJoinedRooms) => {
        const joinedRoom = rooms?.find((room) => room._id === roomId);

        if (!joinedRoom) return prevJoinedRooms;

        if (!prevJoinedRooms) return [joinedRoom];

        const roomExists = prevJoinedRooms.some((room) => room._id === roomId);

        if (roomExists) return prevJoinedRooms;

        return [...prevJoinedRooms, joinedRoom];
      });
    } catch (error) {
      console.error(strings.errorJoiningRoom, error);
    }
  };

  const getActiveRoom = (roomId: string): IChatRoom | undefined => {
    return userJoinedRooms?.find((room) => room._id === roomId);
  };

  const addParticipantToRoom = (roomId: string, participant: IChatUser) => {
    setUserJoinedRooms((prevRooms) => {
      if (!prevRooms?.length) return [];

      return prevRooms.map((room) => {
        if (room._id === roomId) {
          const participantExists = room.participants.some(
            (p) => p._id === participant._id
          );

          if (!participantExists) {
            return {
              ...room,
              participants: [...room.participants, participant],
              updated: new Date(),
            };
          }
        }
        return room;
      });
    });
  };

  const removeParticipantFromRoom = (roomId: string, userId: string) => {
    setUserJoinedRooms((prevRooms) => {
      if (!prevRooms) return [];

      return prevRooms.map((room) => {
        if (room._id === roomId) {
          return {
            ...room,
            participants: room.participants.filter((p) => p._id !== userId),
            updated: new Date(),
          };
        }
        return room;
      });
    });
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
        addParticipantToRoom,
        removeParticipantFromRoom,
        clearAllRooms,
        getRoomById,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
