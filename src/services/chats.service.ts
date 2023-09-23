import supabase from "./supabase";
import { throwError } from "src/utils/error.util";
import { updateImg } from "src/utils/update-img.util";

export async function getConversations({ userId }: { userId: string }) {
  let query = supabase
    .from("conversation")
    .select(
      "*,created_at,friend_profile(avatar,id,fullname),last_send_profile(id,fullname)"
    );

  query = query
    .eq("user_id", userId)
    .eq("isChatted", true)
    .order("lastMessageAt", { ascending: false });
  const { data, error } = await query;
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
  lastMessage,
  lastMessageAt,
  lastSendId,
}: {
  userId: string;
  roomId: string;
  friendId: string;
  lastSendId: string;
  lastMessageAt: string;
  lastMessage: string;
}) {
  const { data, error } = await supabase
    .from("conversation")
    .insert([
      {
        user_id: userId,
        friend_id: friendId,
        last_sent_id: lastSendId,
        lastMessageAt: lastMessageAt,
        isChatted: true,
        lastMessage,
        unReadMessageCount: 1,
        room_id: roomId,
        isRead: false,
        type: "normal",
      },
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
  conversationType = "normal",
}: {
  field: string | string[];
  value: string | boolean | number | (string | boolean | number)[];
  userId: string;
  roomId: string;
  conversationType: "group" | "normal";
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
  if (conversationType === "normal") {
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
  if (conversationType === "group") {
    const { data, error } = await supabase
      .from("group_conversation")
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
}
export async function createNewMessage({
  authorId,
  userId,
  message,
  emoji,
  roomId,
}: {
  authorId: string;
  userId: string;
  message: string;
  emoji: string[];
  roomId: string;
}) {
  const { data, error } = await supabase
    .from("message")
    .insert([
      {
        user_id: userId,
        author_id: authorId,
        message,
        emojis: emoji,
        room_id: roomId,
      },
    ])
    .select(
      "id,author_id,created_at,emojis,isRead,message,room_id,user_id,author_profile(avatar,id,fullname,email,gender)"
    );
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  // after create a new Message set isChatted in conversation is true and is read to false
  if (!data) return null;
  return data[0] as {
    id: string;
    author_id: string;
    created_at: string;
    emojis: string[];
    isRead: boolean;
    message: string;
    room_id: string;
    user_id: string;
  };
}
export async function createImgMessage({
  authorId,
  userId,
  img,
  emoji,
  roomId,
}: {
  authorId: string;
  userId: string;
  img: File;
  emoji: string[];
  roomId: string;
}) {
  const avatarPath = await updateImg(userId, "message_img", img);
  const { data, error } = await supabase
    .from("message")
    .insert([
      // 2 rows for 2 user
      {
        user_id: userId,
        author_id: authorId,
        message: avatarPath,
        emojis: emoji,
        room_id: roomId,
      },
    ])
    .select(
      "id,author_id,created_at,emojis,isRead,message,room_id,user_id,author_profile(avatar,id,fullname,email,gender)"
    )
    .single();
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
  };
}
export async function getAllMessages({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("message")
    .select("*,author_profile(avatar,id,fullname,email,gender)")
    .eq("room_id", roomId)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as IMessage[];
}

export async function deleteMessage({ messageId }: { messageId: string }) {
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
  // await updateConversation({
  //   userId,
  //   roomId,
  //   field: "isChatted",
  //   value: false,
  // });
  return data;
}

export const getSearchedMessage = async ({
  message,
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from("message")
    .select("created_at,id ,message,author_profile(avatar, fullname) ")
    .eq("room_id", roomId)
    .eq("user_id", userId)
    .ilike("message", `${message}%`);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as
    | {
        id: string;
        created_at: string;
        message: string;
        author_profile: IUserProfile;
      }[]
    | null;
};
