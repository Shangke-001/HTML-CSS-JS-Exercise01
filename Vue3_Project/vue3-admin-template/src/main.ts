import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//svg配置
import 'virtual:svg-icons-register'
//引入全局scss
import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

//全局组件注册
import globalComponents from '@/components'
app.use(globalComponents)

app.mount('#app')
