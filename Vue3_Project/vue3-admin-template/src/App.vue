<script setup lang="ts">
//Element-Plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = zhCn
//console.log(import.meta.env)   //获取环境变量
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
