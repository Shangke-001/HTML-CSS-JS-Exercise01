import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { TOKEN_SET, TOKEN_GET, TOKEN_REMOVE } from '@/utils/storage'
import type {
  loginForm,
  loginResponseForm,
  userInfoResponseForm,
  logoutResponseForm
} from '@/api/user/type'
import type { storeType } from './types/type'
import {
  constantRoutes,
  asyncRoutes,
  anyRoutes,
  filterAsyncRoute,
  addAsyncAnyRoutes
} from '@/router/routes'
import cloneDeep from 'lodash/cloneDeep'

const userStore = defineStore('user', () => {
  let token = ref<storeType['token']>(TOKEN_GET('USER_TOKEN'))
  let menuRoutes = ref<storeType['menuRoutes']>(constantRoutes)
  let btnAccess = ref<string[]>()
  let userName = ref<storeType['userName']>('')
  let userAvatar = ref<storeType['userAvatar']>('')
  //用户登录token
  async function userLogin(data: loginForm) {
    let result: loginResponseForm = await reqLogin(data)
    if (result.code == 200) {
      token.value = result.data as string
      //持久化
      TOKEN_SET('USER_TOKEN', result.data as string)
      return 'OK'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  //用户信息获取
  async function userInfo() {
    let result: userInfoResponseForm = await reqUserInfo()
    if (result.code == 200) {
      userName.value = result.data.name
      userAvatar.value = result.data.avatar
      //动态路由过滤并注册
      const userAsyncRoutes = filterAsyncRoute(cloneDeep(asyncRoutes), result.data.routes)
      menuRoutes.value = [...constantRoutes, ...userAsyncRoutes, ...anyRoutes]
      addAsyncAnyRoutes([...userAsyncRoutes, ...anyRoutes])
      //按钮权限获取
      btnAccess.value = result.data.buttons
      /* 按钮权限
        'cuser.detail',
        'cuser.update',
        'cuser.delete',
        'btn.User.add',
        'btn.User.remove',
        'btn.User.update',
        'btn.User.assgin',
        'btn.Role.assgin',
        'btn.Role.add',
        'btn.Role.update',
        'btn.Role.remove',
        'btn.Permission.add',
        'btn.Permission.update',
        'btn.Permission.remove',
        'btn.Activity.add',
        'btn.Activity.update',
        'btn.Activity.rule',
        'btn.Coupon.add',
        'btn.Coupon.update',
        'btn.Coupon.rule',
        'btn.OrderList.detail',
        'btn.OrderList.Refund',
        'btn.UserList.lock',
        'btn.Category.add',
        'btn.Category.update',
        'btn.Category.remove',
        'btn.Trademark.add',
        'btn.Trademark.update',
        'btn.Trademark.remove',
        'btn.Attr.add',
        'btn.Attr.update',
        'btn.Attr.remove',
        'btn.Spu.add',
        'btn.Spu.addsku',
        'btn.Spu.update',
        'btn.Spu.skus',
        'btn.Spu.delete',
        'btn.Sku.updown',
        'btn.Sku.update',
        'btn.Sku.detail',
        'btn.Sku.remove'
      */
      return 'OK'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  //用户退出登录
  async function userLogout() {
    let result: logoutResponseForm = await reqLogout()
    if (result.code == 200) {
      token.value = ''
      userName.value = ''
      userAvatar.value = ''
      TOKEN_REMOVE('USER_TOKEN')
      return 'OK'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  return {
    token,
    menuRoutes,
    userLogin,
    userInfo,
    userName,
    userAvatar,
    userLogout,
    btnAccess
  }
})
export { userStore }
