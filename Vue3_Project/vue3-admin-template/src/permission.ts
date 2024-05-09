//路由守卫
import router from './router'
import setting from './setting'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//去掉nprogress小圈圈
nprogress.configure({ showSpinner: false })

import pinia from '@/stores/index'
import { userStore } from '@/stores/modules/user'
const userS = userStore(pinia)

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.projectName}-${to.meta.title}`
  //进度条
  nprogress.start()
  //路由鉴权
  if (userS.token) {
    //登陆成功：不可以访问login 其余都可以
    if (to.path == '/login') {
      next('/home')
    } else {
      //获取用户信息
      if (userS.userName) {
        next()
      } else {
        try {
          await userS.userInfo()
          next()
        } catch (error) {
          //token过期要logout
          await userS.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录 ：可以访问login 其余都不行
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
