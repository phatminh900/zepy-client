import supabase from "./supabase";
import { throwError } from "src/utils/error.util";
export async function getConversations({ userId }: { userId: string }) {
  const { data, error } = await supabase
    .from("conversation")
    .select(
      "*,friend_profile(avatar,id,fullname),last_send_profile(id,fullname)"
    )
    .eq("user_id", userId)
    .eq("isChatted", true)
    .order("lastMessageAt", { ascending: false });
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as IConversation[];
}
export async function getConversation({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) {
  const { data, error } = await supabase
    .from("conversation")
    .select("*,friend_profile(avatar,id,fullname,status)")
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .single();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as IConversation;
}
export async function createNewConversation({
  userId,
  friendId,
  roomId,
}: {
  userId: string;
  roomId: string;
  friendId: string;
}) {
  const { data, error } = await supabase
    .from("conversation")
    .insert([
      // create 2 records for different user
      { user_id: userId, friend_id: friendId, isRead: false, room_id: roomId },
      { user_id: friendId, friend_id: userId, isRead: false, room_id: roomId },
    ])
    .select();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }

  return data;
}
export async function deleteConversation({
  roomId,
}: {
  userId: string;
  roomId: string;
  friendId: string;
}) {
  const { error } = await supabase
    .from("conversation")
    .delete()
    .eq("room_id", roomId);

  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
}

export async function updateConversation({
  userId,
  roomId,
  field,
  value,
}: {
  field: string | string[];
  value: string | boolean | number | (string | boolean | number)[];
  userId: string;
  roomId: string;
}) {
  const updated: { [key: string]: boolean | string | number } = {};
  if (Array.isArray(field) && Array.isArray(value)) {
    for (let i = 0; i < field.length; i++) {
      updated[field[i]] = value[i];
    }
  }
  if (typeof field === "string" && !Array.isArray(value)) {
    updated[field] = value;
  }
  const { data, error } = await supabase
    .from("conversation")
    .update(updated)
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as IConversation;
}
export async function createNewMessage({
  authorId,
  userId,
  friendId,
  message,
  emoji,
  roomId,
}: {
  authorId: string;
  friendId: string;
  userId: string;
  message: string;
  emoji: string[];
  roomId: string;
}) {
  const { data, error } = await supabase
    .from("message")
    .insert([
      // 2 rows for 2 user
      {
        user_id: userId,
        author_id: authorId,
        message,
        emojis: emoji,
        room_id: roomId,
      },
      {
        user_id: friendId,
        author_id: authorId,
        message,
        emojis: emoji,
        room_id: roomId,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  // after create a new Message set isChatted in conversation is true and is read to false

  return data as {
    id: string;
    author_id: string;
    created_at: string;
    emojis: string[];
    isRead: boolean;
    message: string;
    room_id: string;
    user_id: string;
  }[];
}
export async function getAllMessages({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  console.log("new request is sent");
  const { data, error } = await supabase
    .from("message")
    .select("*,author_profile(avatar,id,fullname,email,gender)")
    .eq("room_id", roomId)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as IMessage[];
}
export async function deleteMessage({ messageId }: { messageId: string }) {
  console.log(messageId);
  const { data, error } = await supabase
    .from("message")
    .delete()
    .eq("id", messageId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data;
}
export async function deleteAllMessages({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("message")
    .delete()
    .eq("room_id", roomId)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  // after delete all message set is chatted to false =>>>>
  await updateConversation({
    userId,
    roomId,
    field: "isChatted",
    value: false,
  });
  return data;
}
