import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";

import router from "./router";
import store from "./store";
import Button from "primevue/button";
import TreeSelect from "primevue/treeselect";
import InputText from "primevue/inputtext";
import { Editor } from "@tiptap/vue-3";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);

app.use(PrimeVue);

app.component("MyButton", Button);
app.component("TreeSelect", TreeSelect);
app.component("InputText", InputText);
app.component("Editor", Editor);
app.use(store).use(router);
app.mount("#app");
