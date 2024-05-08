import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin } from '@/api/user'
import { TOKEN_SET, TOKEN_GET } from '@/utils/storage'
import type { loginForm, loginResponse } from '@/api/user/type'
import type { storeType } from './types/type'
import { constantRoutes } from '@/router/routes'

const userStore = defineStore('user', () => {
  let token = ref<storeType['token']>(TOKEN_GET('USER_TOKEN'))
  const menuRoutes = ref<storeType['menuRoutes']>(constantRoutes)
  async function userLogin(data: loginForm) {
    let result: loginResponse = await reqLogin(data)

    if (result.code == 200) {
      token.value = result.data.token as string
      //持久化
      TOKEN_SET('USER_TOKEN', result.data.token as string)
      return 'OK'
    } else {
      return Promise.reject(new Error(result.data.message))
    }
  }
  return {
    token,
    menuRoutes,
    userLogin
  }
})
export { userStore }
