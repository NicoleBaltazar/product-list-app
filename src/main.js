import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

// createApp(App).mount('#app')

const app = createApp(App);
app.use(createPinia());
app.use(router); //new added for the routing
app.mount("#app");
