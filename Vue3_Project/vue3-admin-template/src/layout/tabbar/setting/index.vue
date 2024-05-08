<template>
  <el-button :icon="RefreshRight" circle size="small" />
  <el-button :icon="FullScreen" circle size="small" />
  <el-button :icon="Tools" circle size="small" />
  <img src="/logo.jpg" alt="头像" width="30px" height="30px" style="margin: 0 10px" />
  <el-dropdown>
    <span>
      <span>admin</span>
      <ElIcon iconName="ArrowDown"></ElIcon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import ElIcon from '@/components/ElIcon/index.vue'
import { RefreshRight, FullScreen, Tools } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss"></style>
