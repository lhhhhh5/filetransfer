import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import "@/reset/index.scss"

app.use(router)
app.use(ElementPlus)
app.mount('#app')

