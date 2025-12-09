import axios from "axios";
import { API_ROUTES } from "../constants-global/api-routes";

export const getInstance = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchData = ({
  requestUrl,
  params,
  isFullPath,
}: {
  requestUrl: string;
  params?: { [key: string]: unknown };
  isFullPath?: boolean;
}) => {
  const url = !isFullPath ? `${API_ROUTES.BASE_URL}${requestUrl}` : requestUrl;
  return getInstance().get(url, params);
};

export const deleteData = async (
  requestUrl: string,
  params?: { [key: string]: unknown }
) => {
  const response = await getInstance().delete(
    `${API_ROUTES.BASE_URL}${requestUrl}`,
    params
  );
  return response.data;
};

export const patchData = async (requestUrl: string, params: unknown) => {
  const response = await getInstance().patch(
    `${API_ROUTES.BASE_URL}${requestUrl}`,
    params
  );
  return response.data;
};

export const putData = async (requestUrl: string, params: unknown) => {
  const response = await getInstance().put(
    `${API_ROUTES.BASE_URL}${requestUrl}`,
    params
  );
  return response.data;
};

export const postData = async ({
  requestUrl,
  params,
  isFullPath,
}: {
  requestUrl: string;
  params: unknown;
  isFullPath?: boolean;
}) => {
  const url = !isFullPath ? `${API_ROUTES.BASE_URL}${requestUrl}` : requestUrl;

  const response = await getInstance().post(url, params);
  return response.data;
};

export const getData = async (
  requestUrl: string,
  params: { [key: string]: unknown }
) => {
  const response = await getInstance().get(
    `${API_ROUTES.BASE_URL}${requestUrl}`,
    params
  );
  return response.data;
};
