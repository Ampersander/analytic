<script lang="ts" setup>
import TodoListItem from "./TodoListItem.vue";
import { useTodos } from "../composables/useTodos";
import { useAddTodo } from "../composables/useAddTodo";

const addTodo = useAddTodo();
const todos = useTodos();
</script>

<template>
  <transition-group tag="ul">
    <todo-list-item v-for="todo in todos" :key="todo.id" :todo="todo" />
    <button key="add" @click="addTodo">+</button>
  </transition-group>
</template>

<style scoped>
ul {
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

button {
  align-self: flex-start;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.v-enter-from {
  opacity: 0;
}
</style>
