import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { APP_CONSTANT } from "src/constants/app.constant";
import { ROUTES } from "src/constants/navigation.constant";
import { useUpdateUserStatus } from "src/features/user/user-feature.hook";
import { useGetUser } from "src/hooks/useAuth";
import supabase from "src/services/supabase";
import Loader from "src/ui/Loader";
const ProtectRoute = ({ children }: Children) => {
  const { user, isLoading, refetch } = useGetUser();
  const { updateInfo } = useUpdateUserStatus();
  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (!user) return;
    const appChannel = supabase.channel(APP_CONSTANT.APP_CHANNEL);
    appChannel
      .on("presence", { event: "sync" }, () => {
        appChannel.presenceState();
      })
      .on("presence", { event: "join" }, () => {
        updateInfo({ userId: user.id, value: "Online" });
      })
      .on("presence", { event: "leave" }, () => {
        updateInfo({ userId: user.id, value: new Date().toISOString() });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await appChannel.track({
            user: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });
  }, [user, updateInfo]);
  if (isLoading) return <Loader />;
  if (!user && !isLoading) return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
export default ProtectRoute;
