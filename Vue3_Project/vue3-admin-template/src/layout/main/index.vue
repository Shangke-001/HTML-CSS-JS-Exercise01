<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- v-if销毁做刷新 -->
      <component :is="Component" v-if="flagShow"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import layoutSettingStore from '@/stores/modules/setting'
import { watch, ref, nextTick } from 'vue'

const layoutSettingS = layoutSettingStore()
let flagShow = ref<boolean>(true)
watch(
  () => layoutSettingS.reFresh, //深拷贝
  () => {
    flagShow.value = false
    nextTick(() => {
      flagShow.value = true
    })
  }
)
</script>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 100;
}
</style>
