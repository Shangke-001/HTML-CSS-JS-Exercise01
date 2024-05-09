import { defineStore } from 'pinia'
import { ref } from 'vue'
export default defineStore('layoutSettingStore', () => {
  let isCollapse = ref<boolean>(false)
  let reFresh = ref<boolean>(false)
  function layoutCollapse() {
    isCollapse.value = !isCollapse.value
  }
  function layoutReFresh() {
    reFresh.value = !reFresh.value
  }
  return {
    isCollapse,
    layoutCollapse,
    reFresh,
    layoutReFresh
  }
})
