import { Todo } from "../Todo";
import { createGlobalState, useLocalStorage } from "@vueuse/core";

export const useTodos = createGlobalState(() => {
  return useLocalStorage<Todo[]>("@vue-todos/todos", []);
});
