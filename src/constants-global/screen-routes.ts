export const SCREEN_ROUTES = {
  CHAT_LIST: "/chat-list",
  USER_AUTH: "/user-auth",
};

export type TScreenRoutes = (typeof SCREEN_ROUTES)[keyof typeof SCREEN_ROUTES];
