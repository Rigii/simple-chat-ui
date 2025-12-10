import { API_ROUTES } from "../../../constants-global/api-routes";
import type { IRoomMessage } from "../../../context/chat-context/types";
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
