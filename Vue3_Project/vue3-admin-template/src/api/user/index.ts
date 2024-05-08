//统一管理用户相关接口
import requestaxios from '@/utils/requestaxios'
import type { loginForm, loginResponse, userInfoResponse } from './type'
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}
//暴露请求函数
export const reqLogin = (data: loginForm) => {
  return requestaxios<any, loginResponse>({
    url: API.LOGIN_URL,
    method: 'post',
    data
  })
}

export const reqUserInfo = () => {
  return requestaxios<any, userInfoResponse>({
    url: API.USERINFO_URL,
    method: 'get'
  })
}
