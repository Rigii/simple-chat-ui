import { useState, useEffect, type ReactNode } from "react";
import { ChatContext } from "./chat-context";
import type { IChatRoom, IChatUser } from "./types";

export const ChatStateProvider = ({ children }: { children: ReactNode }) => {
  const chatLocalStorageStore = (rooms: IChatRoom[] | null) => {
    localStorage.setItem("chatRooms", JSON.stringify(rooms));
  };

  const chatLocalStorageRetrieve = (): IChatRoom[] | null => {
    const stored = localStorage.getItem("chatRooms");
    return stored ? JSON.parse(stored) : null;
  };

  const [rooms, setRooms] = useState<IChatRoom[] | null>(() => {
    const storedRooms = chatLocalStorageRetrieve();
    return storedRooms;
  });

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (rooms !== null) {
      chatLocalStorageStore(rooms);
    }
  }, [rooms]);

  const setRoom = (room: IChatRoom) => {
    setRooms((prevRooms) => {
      if (!prevRooms) {
        return [room];
      }

      const existingIndex = prevRooms.findIndex((r) => r.id === room.id);

      if (existingIndex >= 0) {
        const updatedRooms = [...prevRooms];
        updatedRooms[existingIndex] = {
          ...updatedRooms[existingIndex],
          ...room,
          updated: new Date(),
        };
        return updatedRooms;
      } else {
        return [
          ...prevRooms,
          { ...room, created: new Date(), updated: new Date() },
        ];
      }
    });
  };

  const setAllRooms = (newRooms: IChatRoom[]) => {
    setRooms(newRooms);
  };

  // const updateRoomLastActivity = (roomId: string) => {
  //   setRooms((prevRooms) => {
  //     if (!prevRooms) return null;

  //     return prevRooms.map((room) => {
  //       if (room.id === roomId) {
  //         return {
  //           ...room,
  //           updatedAt: new Date().toISOString(),
  //           updated: new Date(),
  //         };
  //       }
  //       return room;
  //     });
  //   });
  // };

  const addParticipantToRoom = (roomId: string, participant: IChatUser) => {
    setRooms((prevRooms) => {
      if (!prevRooms) return null;

      return prevRooms.map((room) => {
        if (room.id === roomId) {
          const participantExists = room.participants.some(
            (p) => p.id === participant.id
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
    setRooms((prevRooms) => {
      if (!prevRooms) return null;

      return prevRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            participants: room.participants.filter((p) => p.id !== userId),
            updated: new Date(),
          };
        }
        return room;
      });
    });
  };

  const clearAllRooms = () => {
    setRooms(null);
    localStorage.removeItem("chatRooms");
  };

  const getRoomById = (roomId: string): IChatRoom | undefined => {
    return rooms?.find((room) => room.id === roomId);
  };

  return (
    <ChatContext.Provider
      value={{
        rooms,
        activeRoomId,
        setActiveRoomId,
        setRoom,
        setAllRooms,
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
