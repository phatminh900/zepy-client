import supabase from "./supabase";
import { throwError } from "src/utils/error.util";
export const getUserSocketId = async (userId: string) => {
  const { data, error } = await supabase
    .from("active_user")
    .select("socket_id")
    .eq("user_id", userId)
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as { socket_id: string } | null;
};
export const getUserCallSocketId = async (userId: string, callId: string) => {
  const { data, error } = await supabase
    .from("call_participant")
    .select("socket_id")
    .eq("user_id", userId)
    .eq("call_id", callId)
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as { socket_id: string } | null;
};
export const createNewCall = async (userId: string, userReceiveId: string) => {
  const { data, error } = await supabase
    .from("call")
    .insert([{ user_id: userId, user_receive_id: userReceiveId }])
    .select("id")
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as { id: string; user_id: string; user_receive_id: string };
};
export const updateUserCallingSocketId = async (
  userId: string,
  userSocketId: string
) => {
  const { data, error } = await supabase
    .from("call")
    .update({ user_call_socketId: userSocketId })
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as { id: string; user_id: string; user_call_socketId: string };
};
export const getCall = async (callId: string) => {
  const { data, error } = await supabase
    .from("call")
    .select(
      "id,user_id,user_receive_id,user_call_profile (id,fullname,avatar),user_receive_profile (id,fullname,avatar)"
    )
    .eq("id", callId)
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as ICallData | null;
};
export const createNewCallParticipant = async (
  callId: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("call_participant")
    .insert([
      {
        call_id: callId,
        user_id: userId,
      },
    ])
    .select("*")

    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as { call_id: string; user_id: string; id: string };
};
export const updateCallParticipantSocketId = async ({
  callId,
  userId,
  socketId,
}: {
  callId: string;
  userId: string;
  socketId: string;
}) => {
  const { data, error } = await supabase
    .from("call_participant")
    .update({ socket_id: socketId })
    .eq("call_id", callId)
    .eq("user_id", userId)

    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as {
    call_id: string;
    user_id: string;
    id: string;
    socket_id: string;
  } | null;
};
