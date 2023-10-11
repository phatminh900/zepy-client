import { useEffect, useContext, useCallback, createContext } from "react";
import { useCreateCall } from "src/features/call/call.hook";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");

function openNewWindowCall(callId: string, roomId: string) {
  void window.open(
    `/call/${callId}?roomId=${roomId}`,
    "_blank",
    "rel=noopener noreferrer popup"
  );
}

interface ICallContext {
  callOther: ({
    userCallingId,
    userIdToCall,
    roomId,
  }: {
    userIdToCall: string;
    userCallingId: string;
    roomId: string;
  }) => void;
  answerCall: ({ userId, callId }: { userId: string; callId: string }) => void;
}
export const CallCtx = createContext<ICallContext | null>(null);
const CallContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { createAnewCall } = useCreateCall();

  const callOther = useCallback(
    ({
      userCallingId,
      userIdToCall,
      roomId,
    }: {
      userIdToCall: string;
      userCallingId: string;
      roomId: string;
    }) => {
      createAnewCall({
        userId: userCallingId,
        userReceiveId: userIdToCall,
      }).then((data) => {
        openNewWindowCall(data.id, roomId);
      });
    },
    [createAnewCall]
  );
  const answerCall = useCallback(
    ({ callId }: { userId: string; callId: string }) => {
      socket.emit("join_call", { callId });
    },
    []
  );

  // receive call
  useEffect(() => {
    socket.on(
      "other_call",
      ({
        callId,
      }: {
        callId: string;
        userAvatar: string;
        userName: string;
      }) => {
        openNewWindowCall(callId, "12321");
      }
    );
  }, []);
  return (
    <CallCtx.Provider value={{ callOther, answerCall }}>
      {children}
    </CallCtx.Provider>
  );
};
export const useCallContext = () => {
  const ctx = useContext(CallCtx);
  if (!ctx) throw new Error("Using call context out side of provider");
  return ctx;
};
export default CallContextProvider;
