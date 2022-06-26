import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@/assets/base.css";
import primeVue from "./primeVue.js";
import store from "./store";

const app = createApp(App);
primeVue(app);

app.use(store);
app.use(router);

app.mount("#app");
