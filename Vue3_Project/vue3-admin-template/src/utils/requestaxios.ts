//axios二次封装：使用请求与响应拦截器
import axios from 'axios'
import { userStore } from '@/stores/modules/user'

const requestaxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

//请求拦截器
requestaxios.interceptors.request.use(
  (config) => {
    //发送请求之前，携带公共响应头等
    const userS = userStore()
    config.headers.token = userS.token
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

//响应拦截器
requestaxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage.error(msg)
    return Promise.reject(error)
  }
)

export default requestaxios
