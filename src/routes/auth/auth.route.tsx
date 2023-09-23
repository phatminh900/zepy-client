import { ROUTES } from "src/constants/navigation.constant";

import { Navigate } from "react-router-dom";

import Loader from "src/ui/Loader";
import useAuth from "./auth.hook";

const ProtectRoute = ({ children }: Children) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  if (!user && !isLoading) return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
export default ProtectRoute;
