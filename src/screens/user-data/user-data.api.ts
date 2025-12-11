import { API_ROUTES } from "../../constants-global/api-routes";
import { postData } from "../../services/rest-api/rest-api.service";
import type { IPostUserData, IUserDataValues } from "./user-data.types";

export const postUserData = async (
  data: IPostUserData
): Promise<IUserDataValues> => {
  const response = await postData({
    requestUrl: API_ROUTES.USER_PROFILE,
    params: data,
  });
  return response;
};
