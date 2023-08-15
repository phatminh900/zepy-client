import { AuthError, PostgrestError } from "@supabase/supabase-js";

export const throwError = (
  err: AuthError | PostgrestError | null,
  msg: string
) => {
  console.log(err);
  throw new Error(msg || "something went wrong");
};
