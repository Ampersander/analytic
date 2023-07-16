import { toRaw } from "vue";
import { Todo } from "../Todo";
import { useTodos } from "./useTodos";

export function useDeleteTodo() {
    const todos = useTodos();

    return (id: Todo["id"]) => {
        todos.value = todos.value
            .map((t) => toRaw(t))
            .filter((todo) => todo.id !== id);
    };
}
