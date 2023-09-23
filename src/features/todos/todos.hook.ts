import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { QueryKey } from "src/constants/query-key.constant";
import { useGetUser } from "src/hooks/useAuth";
import {
  createANewList as createANewListApi,
  getLists,
  deleteList as deleteAListApi,
  createANewTask as createANewTaskApi,
  toggleCompletedTask as toggleCompletedTaskApi,
  deleteATask as deleteATaskApi,
  setDeadlineTask as setDeadlineTaskApi,
  getTasks,
} from "src/services/todos.service";
export const useTodoLists = () => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  const query = useQueryClient();
  // Mutate
  const { mutate: createANewList, isLoading: isCreatingANewList } = useMutation(
    {
      mutationFn: createANewListApi,
      onSuccess: (data) => {
        query.invalidateQueries([QueryKey.TODO_LISTS]);
        navigate(data.id);
      },
    }
  );
  const { mutate: deleteAList, isLoading: isDeletingAList } = useMutation({
    mutationFn: deleteAListApi,
    onSuccess: () => {
      query.invalidateQueries([QueryKey.TODO_LISTS]);
    },
  });

  //   query
  const { data: todoLists, isLoading: isGettingTodoLists } = useQuery({
    queryFn: () => getLists({ userId: user!.id }),
    queryKey: [QueryKey.TODO_LISTS],
  });

  return {
    createANewList,
    isCreatingANewList,
    todoLists,
    isGettingTodoLists,
    deleteAList,
    isDeletingAList,
  };
};
export const useTodoTasks = () => {
  const query = useQueryClient();
  const { id } = useParams();

  // mutate
  const { mutate: createANewTask, isLoading: isCreatingANewTask } = useMutation(
    {
      mutationFn: createANewTaskApi,
      onSuccess: () => {
        query.invalidateQueries([QueryKey.TODO_TASKS, id]);
      },
    }
  );
  const { mutate: toggleCompletedTask, isLoading: isToggingCompletedTask } =
    useMutation({
      mutationFn: toggleCompletedTaskApi,
      onSuccess: () => {
        query.invalidateQueries([QueryKey.TODO_TASKS, id]);
      },
    });
  const { mutate: deleteATask, isLoading: isDeleteATask } = useMutation({
    mutationFn: deleteATaskApi,
    onSuccess: () => {
      query.invalidateQueries([QueryKey.TODO_TASKS, id]);
    },
  });
  const { mutate: setDeadlineTask, isLoading: isSetDeadlineTask } = useMutation(
    {
      mutationFn: setDeadlineTaskApi,
    }
  );
  // query
  const { data: tasks, isLoading: isGettingTasks } = useQuery({
    queryFn: () => getTasks({ listId: id! }),
    queryKey: [QueryKey.TODO_TASKS, id],
  });

  return {
    createANewTask,
    isCreatingANewTask,
    toggleCompletedTask,
    isToggingCompletedTask,
    deleteATask,
    isDeleteATask,
    setDeadlineTask,
    isSetDeadlineTask,
    tasks,
    isGettingTasks,
  };
};
