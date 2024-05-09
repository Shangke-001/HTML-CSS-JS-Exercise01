<template>
  <div v-if="!setting.logoNameHidden" class="logo">
    <img :src="setting.logoSrc" alt="logo" />
    <span>{{ setting.projectName }}</span>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 10px;
  img {
    height: $base-menu-logo-height;
    width: $base-menu-logo-height;
    border-radius: 30%;
    margin-right: 25px;
  }
  span {
    font-size: $base-menu-text-fontsize;
    font-weight: 800;
    color: white;
  }
}
</style>
