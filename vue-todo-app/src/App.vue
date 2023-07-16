<script lang="ts" setup>
import TodoList from "./components/TodoList.vue";

// Exemple d'envoi custom d'event
// const customSendEvent: any = inject("SEND_EVENT_CUSTOM");

// customSendEvent({
//     eventType: "view",
//     tag: 'ClickOnMyButton',
//     visitorId: '123'
// });
</script>

<template>
    <h1>Todos</h1>
    <todo-list />
</template>
