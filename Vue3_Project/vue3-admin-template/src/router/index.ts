import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), //使用哈希模式
  routes: constantRoutes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0
    }
  }
})

export default router
