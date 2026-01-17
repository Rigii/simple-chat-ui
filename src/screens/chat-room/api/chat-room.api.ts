import { API_ROUTES } from "../../../constants-global/api-routes";
import type {
  IChatRoom,
  IChatUser,
  IRoomDetails,
  IRoomMessage,
} from "../../../context/chat-context/types";
import { postData } from "../../../services/rest-api/rest-api.service";

export const getRoomMessages = async ({
  chatRoomId,
  userId,
  chunkLimit,
}: {
  chatRoomId: string;
  userId: string;
  chunkLimit?: number;
}): Promise<IRoomMessage[]> => {
  const response = await postData({
    requestUrl: API_ROUTES.GET_CHAT_MESSAGES,
    params: { chatRoomId, userId, chunkLimit },
  });

  return response;
};

export const getRoomDetails = async ({
  chatRoomId,
  userId,
  chunkLimit,
}: {
  chatRoomId: string;
  userId: string;
  chunkLimit?: number;
}): Promise<IRoomDetails> => {
  const response = await postData({
    requestUrl: API_ROUTES.GET_ROOM_DETAILS,
    params: { chatRoomId, userId, chunkLimit },
  });

  return response;
};

export const joinChatRoomAPI = async ({
  roomId,
  userId,
  publicUserId,
}: {
  roomId: string;
  userId: string;
  publicUserId: string;
}): Promise<{ currentRoomData: IChatRoom; currentUserData: IChatUser }> => {
  const response = await postData({
    requestUrl: API_ROUTES.JOIN_CHAT_ROOMS,
    params: { userId, roomId, publicUserId },
  });

  return response;
};
