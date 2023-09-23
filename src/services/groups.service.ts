import { throwError } from "src/utils/error.util";
import supabase from "./supabase";
export async function getAllGroupMembers({ id }: { id: string }) {
  const { data, error } = await supabase
    .from("group_member")
    .select("id,profile(fullname,avatar,status,id,gender)")
    .eq("group_id", id);
  if (error) {
    console.error(error);
    throwError(error, error.message);
  }
  return data as unknown as { id: string; profile: IUserProfile }[];
}
export async function getAllGroups({ userId }: { userId: string }) {
  const { data: groupData, error } = await supabase
    .from("group_member")
    .select("group(name,id,avatar)")
    .eq("user_id", userId);
  const groupResult = groupData || [];
  for (let i = 0; i < groupResult?.length; i++) {
    const { data, error } = await supabase
      .from("group_member")
      .select("id")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .eq("group_id", groupResult[i].group.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    groupResult[i] = { ...groupResult[i], count: data.length };

    if (error) {
      console.log(error);
      throwError(error, error.message);
    }
  }
  if (error) {
    console.log(error);
    throwError(error, error.message);
  }
  return groupResult as unknown as {
    group: IGroup;
    count: number;
  }[];
}
export async function getGroupConversation({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) {
  const { data, error } = await supabase
    .from("group_conversation")
    .select("*,group(name,id,avatar,room_id)")
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .single();

  if (error) {
    console.log(error);
    throwError(error, error.message);
  }
  return data as IGroupConversation;
}
export async function getGroupConversations({ userId }: { userId: string }) {
  const { data, error } = await supabase
    .from("group_conversation")
    .select("*,group(name,id,avatar,room_id),last_send_profile(fullname,id)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throwError(error, error.message);
  }
  return data as IGroupConversation[];
}

export async function createNewGroupConversation({
  groupId,
  userId,
  roomId,
  lastMessage,
  lastMessageAt,
  lastSendId,
}: {
  roomId: string;
  groupId: string;
  userId: string;
  lastSendId: string;
  lastMessageAt: string;
  lastMessage: string;
}) {
  const { data, error } = await supabase
    .from("group_conversation")
    .insert([
      {
        group_id: groupId,
        user_id: userId,
        room_id: roomId,
        isRead: false,
        isChatted: true,
        lastMessage,
        lastMessageAt,
        last_sent_id: lastSendId,
        unReadMessageCount: 1,
        type: "group",
      },
    ])
    .select()
    .single();
  if (error) {
    console.log(error);
    throwError(error, error.message);
  }
  // is read is chatted
  return data as IGroupConversation;
}
export async function createNewGroup({
  name,
  authorId,
  roomId,
}: {
  name: string;
  roomId: string;
  authorId: string;
}) {
  const { data, error } = await supabase
    .from("group")
    .insert([{ main_author_id: authorId, name, room_id: roomId }])
    .select()
    .single();
  if (error) {
    console.log(error);
    throwError(error, error.message);
  }
  return data as IGroup;
}

export async function addGroupMembers({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("group_member")
    .insert([{ group_id: groupId, user_id: userId }])
    .select()
    .single();
  // after adding member create conversations for tthem
  // await createNewConversation({userId,friendId:groupId})
  if (error) {
    console.log(error);
    throwError(error, error.message);
  }
  return data as {
    id: string;
    lastMessageAt: string;
    last_send_it: string;
    user_id: string;
    created_at: string;
    group_id: string;
  };
}
