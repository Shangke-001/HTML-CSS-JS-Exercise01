import { defineStore } from 'pinia'
import { ref } from 'vue'
export default defineStore('layoutSettingStore', () => {
  let isCollapse = ref<boolean>(false)
  function layoutCollapse() {
    isCollapse.value = !isCollapse.value
  }
  return {
    isCollapse,
    layoutCollapse
  }
})
