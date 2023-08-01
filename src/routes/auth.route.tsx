import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import { useGetUser } from "src/hooks/useAuth";
import Loader from "src/ui/Loader";
const ProtectRoute = ({ children }: Children) => {
  const { data, isLoading, refetch } = useGetUser();
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) return <Loader />;
  if (!data && !isLoading) return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
export default ProtectRoute;
