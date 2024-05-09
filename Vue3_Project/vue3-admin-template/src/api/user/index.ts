//统一管理用户相关接口
import requestaxios from '@/utils/requestaxios'
import type { loginForm, loginResponseForm, userInfoResponseForm } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}
//暴露请求函数
export const reqLogin = (data: loginForm) => {
  return requestaxios<any, loginResponseForm>({
    url: API.LOGIN_URL,
    method: 'post',
    data
  })
}

export const reqUserInfo = () => {
  return requestaxios<any, userInfoResponseForm>({
    url: API.USERINFO_URL,
    method: 'get'
  })
}

export const reqLogout = () => {
  return requestaxios<any, any>({
    url: API.LOGOUT_URL,
    method: 'post'
  })
}
