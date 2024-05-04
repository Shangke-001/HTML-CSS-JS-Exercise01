//自定义插件进行全局组件注册
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const allGlobalComponents: any = { SvgIcon }

export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((keyC) => {
      app.component(keyC, allGlobalComponents[keyC])
    })
  }
}
