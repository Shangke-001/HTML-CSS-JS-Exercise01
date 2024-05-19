import { createPinia } from 'pinia'
const pinia = createPinia()
//使用reset方法
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$patch(($state) => {
      Object.assign($state, JSON.parse(JSON.stringify(initialState)))
    })
  }
})
export default pinia
