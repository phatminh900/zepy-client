import { throwError } from "src/utils/error.util";
import supabase, { supabaseUrl } from "./supabase";
import { createNewConversation } from "./chats.service";

export async function searchContact(email: string) {
  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error(error);
    throwError(error, error?.message);
  }
  if (!profile) return [];
  return profile[0];
}
export async function sendFriendRequest({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) {
  const { data, error } = await supabase
    .from("friend_request")
    .insert([{ user_id: userId, friend_id: friendId }])
    .select();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data;
}
export async function getAllFriendRequests({
  userId,
}: {
  userId: string;
}): Promise<{ id: string; user_id: string; friend_id: string }[] | null> {
  const { data, error } = await supabase
    .from("friend_request")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data;
}
export async function getAllRequestedFriend({ userId }: { userId: string }) {
  const { data, error } = await supabase
    .from("friend_request")
    // select user who send request
    .select("id,created_at,friend_id,user_profile(*)")
    // friend_id === the one that other send to me
    .eq("friend_id", userId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  if (!data) return null;
  return data as unknown as IRequestedFriend[];
}
export async function acceptFriend({
  userId,
  friendId,
  roomId,
}: {
  userId: string;
  friendId: string;
  roomId: string;
}) {
  const { data, error } = await supabase
    .from("user_friend")
    .insert([
      // create 2 records for 2 users
      { user_id: userId, friend_id: friendId, room_id: roomId },
      { user_id: friendId, friend_id: userId, room_id: roomId },
    ])
    .select();

  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  // after accepting a friend delete a record in friend_request
  await deleteFriendRequest({ userId });
  // after accepting create 2 new conversation records for 2 users

  await createNewConversation({ userId, friendId, roomId });
  return data as { id: string; user_id: string; friend_id: string }[];
}

export async function deleteFriend({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) {
  const { error: error1 } = await supabase
    .from("user_friend")
    .delete()
    .eq("user_id", userId)
    .eq("friend_id", friendId);
  // delete 2 records
  const { error: error2 } = await supabase
    .from("user_friend")
    .delete()
    .eq("user_id", friendId)
    .eq("friend_id", userId);
  if (error1) {
    console.error(error1);
    throwError(error1, error1.message);
  }
  if (error2) {
    console.error(error2);
    throwError(error2, error2.message);
  }
  // TODO: after deleting friend delete conversation records
}
export async function deleteFriendRequest({ userId }: { userId: string }) {
  const { data, error } = await supabase
    .from("friend_request")
    .delete()
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data;
}

//
export async function getAllFriend({ userId }: { userId: string }) {
  const { data: friends, error } = await supabase
    .from("user_friend")
    .select("id,room_id,friend_profile(*)")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return friends as
    | {
        id: string;
        room_id: string;
        friend_profile: User;
      }[]
    | null;
}
