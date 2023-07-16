<script lang="ts" setup>
import { computed, inject } from "vue";
import { Todo } from "../Todo";
import { useUpdateTodo } from "../composables/useUpdateTodo";
import { useDeleteTodo } from "../composables/useDeleteTodo";

const props = defineProps<{
    todo: Todo;
}>();

const updateTodo = useUpdateTodo();
const deleteTodo = useDeleteTodo();
const customSendEvent: any = inject("SEND_EVENT_CUSTOM");

const text = computed<string>({
    get: () => props.todo.text,
    set: (value) =>
        updateTodo(props.todo.id, {
            text: value,
            done: !!value && props.todo.done,
        }),
});

const checked = computed<boolean>({
    get: () => props.todo.done,
    set: (done) => updateTodo(props.todo.id, { done }),
});

const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId);

    customSendEvent({
        eventType: "click",
        tag: "DeteleOneTodo",
        eventData: {
            todoId,
        },
    });
};
</script>

<template>
    <li :title="checked ? 'Done!' : 'Incomplete'">
        <input
            type="text"
            v-model="text"
            v-tracker="'ClickOnUpdateTodoText'"
            placeholder="Enter todo..."
        />
        <input type="checkbox" v-model="checked" :disabled="!text" />
        <span class="delete" title="Delete" @click="handleDeleteTodo(todo.id)"
            >&cross;</span
        >
    </li>
</template>

<style scoped>
li {
    position: relative;
    width: 100%;
}

input[type="checkbox"] {
    position: absolute;
    top: 0.65rem;
    left: 0.65rem;
}

input[type="text"] {
    width: 100%;
    min-width: 0;
    appearance: none;
    font-size: 1rem;
    padding: 0.6em 2.4rem 0.6em 2.4em;
    background-color: rgb(var(--b2));
    border: 1px solid transparent;
    outline: none;
    border-radius: 8px;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
}

input[type="text"]:focus {
    border-color: rgb(var(--p));
}

span {
    position: absolute;
    right: 0.45rem;
    top: 0.45rem;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0;
    transition: all 0.2s ease;
    cursor: pointer;
    font-weight: bold;
    border-radius: 100%;
    user-select: none;
    --bg-opacity: 0;
    --color: var(--bc);
    background-color: rgba(var(--p) / var(--bg-opacity));
    color: rgb(var(--color));
}
li:hover span {
    opacity: 1;
}
span:hover {
    --bg-opacity: 0.1;
    --color: var(--p);
}
span:active:hover {
    transform: scale(0.85);
}
</style>
