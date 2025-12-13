import { Navigate, useLocation } from "react-router-dom";
import { type TScreenRoutes } from "../constants-global/screen-routes";
import { useUserContext } from "../context/user-context/use-user-context";

export const SecurityRoute = ({
  component,
  redirectRoute,
}: {
  component: React.ReactNode;
  redirectRoute: TScreenRoutes;
}) => {
  const { user } = useUserContext();

  const location = useLocation();

  return user?.nickname ? (
    component
  ) : (
    <Navigate to={redirectRoute} replace state={{ from: location }} />
  );
};
