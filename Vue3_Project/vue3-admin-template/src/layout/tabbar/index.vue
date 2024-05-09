<template>
  <div class="tabbar-container">
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tabbar-left,
  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
