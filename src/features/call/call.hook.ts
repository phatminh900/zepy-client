import { useMutation, useQuery } from "@tanstack/react-query";

import { QueryKey } from "src/constants/query-key.constant";

import {
  createNewCall,
  createNewCallParticipant,
  getCall as getCallApi,
  getUserSocketId as getUserSocketIdApi,
} from "src/services/call.service";

export const useCreateCall = () => {
  const {
    mutateAsync: createAnewCall,
    isLoading: isCreatingANewCall,
    isSuccess: isCreatedANewCall,
  } = useMutation({
    mutationFn: ({
      userId,
      userReceiveId,
    }: {
      userId: string;
      userReceiveId: string;
    }) => createNewCall(userId, userReceiveId),
  });
  return { createAnewCall, isCreatingANewCall, isCreatedANewCall };
};
export const useCreateParticipant = () => {
  const { mutateAsync: createParticipant, isLoading: isCreatingParticipant } =
    useMutation({
      mutationFn: ({ callId, userId }: { callId: string; userId: string }) =>
        createNewCallParticipant(callId, userId),
      // onSuccess: async (data) => {
      //   await updateCallParticipantSocketId({
      //     callId: data.call_id,
      //     userId: user!.id,
      //     socketId: socket.id,
      //   });
      // },
      //   socket.emit("join-call", {
      //     callId: data.call_id,
      //     userCallId: callData!.user_id,
      //     userReceiveCallId: user?.id,
      //     participantId: data.id,
      //   });
      // },
    });
  return { createParticipant, isCreatingParticipant };
};
export const useGetCall = ({ callId }: { callId: string }) => {
  const { data: callData, isLoading: isGettingCallData } = useQuery({
    queryKey: [QueryKey.GET_CALL],
    queryFn: () => getCallApi(callId),
  });
  return { callData, isGettingCallData };
};
export const useGetUserCallSocketId = ({ userId }: { userId: string }) => {
  const { data: userSocketId, isLoading: isGettingUserSocketId } = useQuery({
    queryKey: [QueryKey.GET_CALL],
    queryFn: () => getUserSocketIdApi(userId),
  });
  return { userSocketId, isGettingUserSocketId };
};
