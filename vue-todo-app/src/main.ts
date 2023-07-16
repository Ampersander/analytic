import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { trackerVue } from "../../sdk";

const app = createApp(App);

app.use(trackerVue, {
    APP_ID: import.meta.env.VITE_APP_ID,
});
app.mount("#app");
