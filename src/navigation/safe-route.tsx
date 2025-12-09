import { Navigate, useLocation } from "react-router-dom";
import type { IUserDataValues } from "../screens/user-data/user-data.types";
import { type TScreenRoutes } from "../constants-global/screen-routes";

export const SafeRoute = ({
  userData,
  component,
  redirectRoute,
}: {
  userData: IUserDataValues | null;
  component: React.ReactNode;
  redirectRoute: TScreenRoutes;
}) => {
  const location = useLocation();

  return userData?.nickname ? (
    component
  ) : (
    <Navigate to={redirectRoute} replace state={{ from: location }} />
  );
};
