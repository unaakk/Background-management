import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/less/index.less";
import router from "./router";
// import ElementPlus from 'element-plus';//全局引入
// import 'element-plus/dist/index.css';

const app = createApp(App);

// app.use(ElementPlus);
app.use(router).mount("#app"); 