import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "primevue/resources/themes/vela-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "@/assets/base.css";

const app = createApp(App)

app.use(router)

app.mount('#app')
