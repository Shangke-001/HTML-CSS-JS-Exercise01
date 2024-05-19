import pinia from '@/stores/index'
import { userStore } from '@/stores/modules/user'
import { onMounted } from 'vue'
const userS = userStore(pinia)

export default (app: any) => {
  app.directive('has', {
    mounted(el: any, options: any) {
      // console.log(el)
      // console.log(options)
      if (!userS.btnAccess?.includes(options.value)) {
        //没有该权限的话
        el.disabled = true
        el.style.backgroundColor = '#f1f1f1'
        el.style.color = '#aaa'
        el.style.borderColor = '#aaa'
      }
    }
  })
}
