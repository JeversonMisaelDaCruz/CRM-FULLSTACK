import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { clickOutside } from './directives/clickOutside';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

// Registrar diretiva global
app.directive('click-outside', clickOutside);

app.mount("#app");
