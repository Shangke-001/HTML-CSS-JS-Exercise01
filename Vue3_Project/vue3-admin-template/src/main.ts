import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'

//引入全局scss
import '@/styles/index.scss'
//svg配置
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)
app.use(router)

//全局组件注册
import globalComponents from '@/components'
app.use(globalComponents)

//引入路由守卫
import './permission'

//自定义指令（按钮权限）
import hasButton from '@/directive/has'
hasButton(app)

app.mount('#app')
