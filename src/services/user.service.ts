import supabase, { supabaseUrl } from "./supabase";
import { AuthError } from "@supabase/supabase-js";
import { throwError } from "src/utils/error.util";
import { updateImg } from "src/utils/update-img.util";

export async function searchFriend(email: string) {
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
    const avatarPath = await updateImg(userId, "avatars", avatar);
    await updateUser({
      userId,
      field: "avatars",
      value: avatarPath,
    });
  } catch (error) {
    const err = error as AuthError;
    throwError(err, err?.message);
  }
};
