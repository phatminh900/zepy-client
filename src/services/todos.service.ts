import { throwError } from "src/utils/error.util";
import supabase from "./supabase";
export const getLists = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from("todo_list")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  if (error) {
    throwError(error, error?.message);
  }
  return data as ITodoList[];
};
export const createANewList = async ({
  title,
  defaultType = false,
  userId,
}: {
  title: string;
  userId: string;
  defaultType?: boolean;
}) => {
  const { data, error } = await supabase
    .from("todo_list")
    .insert([{ title, user_id: userId, default: defaultType }])
    .select("*")
    .single();
  if (error) {
    throwError(error, error?.message);
  }
  return data as ITodoList;
};
export const deleteList = async ({ id }: { id: string }) => {
  const { data, error } = await supabase
    .from("todo_list")
    .delete()
    .eq("id", id);
  if (error) {
    throwError(error, error?.message);
  }
  return data;
};

// tasks
export const getTasks = async ({ listId }: { listId: string }) => {
  const { data, error } = await supabase
    .from("todo_task")
    .select("*")
    .eq("list_id", listId)
    .order("created_at", { ascending: false });
  if (error) {
    throwError(error, error?.message);
  }
  return data as ITodoTask[];
};
export const createANewTask = async ({
  title,
  isChecked = false,
  deadline,
  listId,
}: {
  title: string;
  listId: string;
  isChecked?: boolean;
  deadline?: string;
}) => {
  const { data, error } = await supabase
    .from("todo_task")
    .insert([{ title, isChecked, deadline, list_id: listId }])
    .select("*")
    .single();
  if (error) {
    throwError(error, error?.message);
  }
  return data as ITodoTask;
};

export const deleteATask = async ({ id }: { id: string }) => {
  const { data, error } = await supabase
    .from("todo_task")
    .delete()
    .eq("id", id);
  if (error) {
    throwError(error, error?.message);
  }
  return data;
};
export const toggleCompletedTask = async ({
  id,
  isChecked,
}: {
  id: string;
  isChecked: boolean;
}) => {
  const { data, error } = await supabase
    .from("todo_task")
    .update({ isChecked })
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    throwError(error, error?.message);
  }
  return data as ITodoTask;
};
export const setDeadlineTask = async ({
  id,
  deadline,
}: {
  id: string;
  deadline: boolean;
}) => {
  const { data, error } = await supabase
    .from("todo_task")
    .update({ deadline })
    .eq("id", id)
    .select("*")
    .single();
  if (error) {
    throwError(error, error?.message);
  }
  return data as ITodoTask;
};
