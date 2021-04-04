import "/@/design/index.less";
// import "virtual:windi.css";

import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store";

const app = createApp(App);

import "ant-design-vue/dist/antd.css";

app.use(router);
app.use(store);

app.mount("#app");
