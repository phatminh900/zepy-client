import supabase, { supabaseUrl } from "src/services/supabase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateImg = async (userId: string, field: string, img: any) => {
  const avatarName = `${field}-${new Date().toISOString()}-${userId}-${
    img.name
  }`;
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/${field}/${avatarName}`;
  const { error } = await supabase.storage.from(field).upload(avatarName, img);
  if (error) {
    throw new Error("There were some problems try again later.");
  }
  return avatarPath;
};
