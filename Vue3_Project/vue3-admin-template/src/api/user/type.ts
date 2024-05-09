//登录接口需要携带的参数ts类型
export interface loginForm {
  username: string
  password: string
}

//全部接口返回内容都有的数据类型
interface responseData {
  code: number
  message: string
  ok: boolean
}

//登录接口返回数据类型
export interface loginResponseForm extends responseData {
  data: string
}

//获取用户信息返回数据类型
export interface userInfoResponseForm extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

//登出返回数据类型
export interface logoutResponseForm extends responseData {
  data: null
}
