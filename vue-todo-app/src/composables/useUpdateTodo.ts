import { toRaw } from "vue";
import { Todo } from "../Todo";
import { useTodos } from "./useTodos";

export function useUpdateTodo() {
  const todos = useTodos();

  return (id: Todo["id"], partial: Partial<Todo>) => {
    const newTodos = todos.value.map((t) => toRaw(t));

    const thisTodo = newTodos.find((t) => t.id === id);
    console.log({ newTodos, thisTodo, id, partial });
    if (!thisTodo) return;

    Object.assign(thisTodo, partial);
    todos.value = newTodos;
  };
}
