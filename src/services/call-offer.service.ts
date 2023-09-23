import supabase from "./supabase";
import { throwError } from "src/utils/error.util";

export const createNewOffer = async ({
  userCreatedId,
  offer,
  participantId,
}: {
  userCreatedId: string;
  participantId: string;
  offer: RTCSessionDescriptionInit;
}) => {
  const { data, error } = await supabase
    .from("call_offer")
    .insert([
      {
        participant_id: participantId,
        user_created_id: userCreatedId,
        type: offer.type,
        sdp: offer.sdp,
      },
    ])
    .select("*")
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as {
    id: string;
    user_created_id: string;
    participant_id: string;
  };
};
export const createNewOfferCandidates = async ({
  userCreatedId,
  offerCandidate,
  participantId,
}: {
  userCreatedId: string;
  participantId: string;
  offerCandidate: RTCIceCandidateInit;
}) => {
  const { data, error } = await supabase
    .from("call_offer_candidate")
    .insert([
      {
        participant_id: participantId,
        user_created_id: userCreatedId,
        ...offerCandidate,
      },
    ])
    .select("*")
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data;
};
export const createNewAnswerCandidates = async ({
  userCreatedId,
  answerCandidate,
  participantId,
}: {
  userCreatedId: string;
  participantId: string;
  answerCandidate: RTCIceCandidateInit;
}) => {
  const { data, error } = await supabase
    .from("call_answer_candidate")
    .insert([
      {
        participant_id: participantId,
        user_created_id: userCreatedId,
        ...answerCandidate,
      },
    ])
    .select("*")
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data;
};
export const createNewAnswer = async ({
  userCreatedId,
  answer,
  participantId,
}: {
  userCreatedId: string;
  participantId: string;
  answer: RTCSessionDescriptionInit;
}) => {
  const { data, error } = await supabase
    .from("call_answer")
    .insert([
      {
        participant_id: participantId,
        user_created_id: userCreatedId,
        type: answer.type,
        sdp: answer.sdp,
      },
    ])
    .select("*")
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as {
    id: string;
    user_created_id: string;
    participant_id: string;
  };
};
export const getParticipant = async ({
  callId,
  userId,
}: {
  callId: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("call_participant")
    .select("*")
    .eq("call_id", callId)
    .eq("user_id", userId)
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as {
    id: string;
    call_id: string;
    user_id: string;
  } | null;
};
export const getCall = async (callId: string) => {
  const { data, error } = await supabase
    .from("call")
    .select(
      "id,user_call_profile (id,fullname,avatar),user_receive_profile (id,fullname,avatar)"
    )
    .eq("id", callId)
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as {
    id: string;
    user_call_profile: { id: string; fullname: string; avatar: string };
    user_receive_profile: { id: string; fullname: string; avatar: string };
  } | null;
};
export const createNewCallParticipant = async (
  callId: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("participant")
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
