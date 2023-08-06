import supabase from "./supabase";
import { throwError } from "src/utils/error.util";

export const signUp = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: fullName,
      },
    },
  });
  console.log(data);
  if (error) {
    throwError(error, error?.message);
  }
  return data;
};
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throwError(error, error?.message);
  }
  console.log(data);
  return data;
};
export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throwError(error, error?.message);
  }
};

export const getUser = async () => {
  const session = await supabase.auth.getSession();
  if (!session) return null;
  const { data: user } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session.data.session?.user.id)
    .single();
  if (!user) return null;
  return user as User;
};
