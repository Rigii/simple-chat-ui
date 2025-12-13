import { API_ROUTES } from "../../constants-global/api-routes";
import type { IChatRoom } from "../../context/chat-context/types";
import { postData } from "../../services/rest-api/rest-api.service";

export interface IGetAllChatsResponse {
  _id: string;
  name: string;
  lastMessage: string;
  updatedAt: string;
}

export const getAllChats = async ({
  participantId,
}: {
  participantId: string;
}): Promise<{
  availableRooms: IChatRoom[];
  interlocutorRooms: IChatRoom[];
}> => {
  const response = await postData({
    requestUrl: API_ROUTES.GET_ALL_CHATS,
    params: { participantId },
  });

  return response;
};
