import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";

import { socket } from "src/contexts/call.context";
import { useUpdateUserStatus } from "src/features/user/user-feature.hook";
const useAuth = () => {
  const query = useQueryClient();
  const { user, isLoading, refetch } = useGetUser();
  const { updateInfo } = useUpdateUserStatus();
  const { pathname } = useLocation();
  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (user?.id && !pathname.includes("call")) {
      socket.emit("logged", { userId: user.id });
    }
  }, [user?.id, pathname]);
  useEffect(() => {
    if (user?.id) {
      return () => {
        socket.emit("leave", { userId: user.id });
      };
    }
  }, [user?.id]);
  // useEffect(() => {
  //   if (!user) return;
  //   const appChannel = supabase.channel(APP_CONSTANT.APP_CHANNEL);
  //   appChannel
  //     .on("presence", { event: "sync" }, () => {
  //       updateInfo({ userId: user.id, value: "Online" });

  //       appChannel.presenceState();
  //     })
  //     .on("presence", { event: "join" }, () => {
  //       updateInfo({ userId: user.id, value: "Online" });
  //     })
  //     .on("presence", { event: "leave" }, () => {
  //       updateInfo({ userId: user.id, value: new Date().toISOString() });
  //     })
  //     .subscribe(async (status) => {
  //       if (status === "SUBSCRIBED") {
  //         await appChannel.track({
  //           user: user.id,
  //           online_at: new Date().toISOString(),
  //         });
  //       }
  //     });
  // }, [user, updateInfo]);

  useEffect(() => {
    if (user?.id) {
      const handleSetUserState = () => {
        // close call doesn't logout

        if (pathname.includes("/call")) {
          socket.emit("leave-call", { userId: user!.id });
          return;
        }
        socket.emit("leave", { userId: user!.id });
        updateInfo({ userId: user!.id, value: new Date().toISOString() });
      };
      socket.on("receive-message-notification", () => {
        query.refetchQueries({ queryKey: [QueryKey.GET_CONVERSATIONS] });
      });
      window.addEventListener("beforeunload", handleSetUserState);
      return () =>
        window.removeEventListener("beforeunload", handleSetUserState);
    }
  }, [updateInfo, user, pathname, query]);
  return { isLoading, user };
};
export default useAuth;
