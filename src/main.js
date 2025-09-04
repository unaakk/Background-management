import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/less/index.less";
import router from "./router";
// import ElementPlus from 'element-plus';//全局引入ElementPlus
// import 'element-plus/dist/index.css';//全局引入ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import "@/api/mock";
import api from "@/api/api";


const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$api = api;//全局挂载api
app.use(pinia);
// app.use(ElementPlus);//全局引入ElementPlus
app.use(router).mount("#app"); 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}