//自定义插件进行全局组件注册
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import ElIcon from '@/components/ElIcon/index.vue'
import Category from '@/components/Category/index.vue'

const allGlobalComponents: any = { SvgIcon, ElIcon, Category }

export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((keyC) => {
      app.component(keyC, allGlobalComponents[keyC])
    })
  }
}
