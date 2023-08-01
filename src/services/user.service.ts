import supabase, { supabaseUrl } from "./supabase";
import { AuthError } from "@supabase/supabase-js";
import { throwError } from "src/utils/error.util";

export async function searchFriend(email: string) {
  console.log(email);
  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    throwError(error, error?.message);
  }
  if (!profile) return [];
  return profile[0];
}
export async function updateUser({
  userId,
  field,
  value,
}: {
  userId: string;
  field: string;
  value: any;
}) {
  const { error } = await supabase
    .from("profile")
    .update({ [field]: value })
    .eq("id", userId);
  if (error) {
    console.error(error.message);
    throwError(error, error?.message);
  }
}
export const updateUserAvatar = async (userId: string, avatar: any) => {
  try {
    const avatarName = `avatar-${new Date().toISOString()}-${userId}-${
      avatar.name
    }`;
    const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar);
    if (error) {
      console.log(error);
      throw new Error("There were some problems try again later.");
    }
    await updateUser({
      userId,
      field: "avatar",
      value: avatarPath,
    });
  } catch (error) {
    const err = error as AuthError;
    throwError(err, err?.message);
  }
};
