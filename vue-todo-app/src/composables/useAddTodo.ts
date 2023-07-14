import { toRaw } from "vue";
import { useTodos } from "./useTodos";

export function useAddTodo() {
  const todos = useTodos();

  const getTodoId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

  return () => {
    const newTodos = todos.value.map((t) => toRaw(t));
    newTodos.push({
      id: getTodoId(),
      text: "",
      done: false,
    });
    todos.value = newTodos;
  };
}
