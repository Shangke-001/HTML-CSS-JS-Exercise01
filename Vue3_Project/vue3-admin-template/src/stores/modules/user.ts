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
import { constantRoutes } from '@/router/routes'

const userStore = defineStore('user', () => {
  let token = ref<storeType['token']>(TOKEN_GET('USER_TOKEN'))
  const menuRoutes = ref<storeType['menuRoutes']>(constantRoutes)
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
      return 'OK'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  //用户推出登录
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
    userLogout
  }
})
export { userStore }
