import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import store from "./store";
import Button from "primevue/button";
import TreeSelect from "primevue/treeselect";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);

app.use(PrimeVue);
app.component("MyButton", Button);
app.component("TreeSelect", TreeSelect);
app.use(store).use(router);
app.mount("#app");
