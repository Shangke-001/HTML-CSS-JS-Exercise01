//登录接口需要携带的参数ts类型
export interface loginForm {
  username: String
  password: String
}

//登录接口返回的数据类型
interface dataType {
  token: String
}
export interface loginResponse {
  code: Number
  data: dataType
}

//获取用户信息返回的数据类型
interface userInfo {
  userId: Number
  avatar: String
  username: String
  password: String
  desc: String
  roles: String[]
  buttons: String[]
  routes: String[]
  token: String
}
interface user {
  checkUser: userInfo
}
export interface userInfoResponse {
  code: Number
  data: user
}
