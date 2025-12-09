import { API_ROUTES } from "../../constants-global/api-routes";
import { postData } from "../../services/rest-api.service";
import type { IUserDataValues } from "./user-data.types";

export const postUserData = async (data: IUserDataValues) => {
  const response = await postData({
    requestUrl: API_ROUTES.USER_PROFILE,
    params: data,
  });
  return response;
};
