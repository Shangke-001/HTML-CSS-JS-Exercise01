<template>
  <el-container class="home-container">
    <el-aside :width="layoutSettingS.isCollapse ? '70px' : '250px'" class="home-menu">
      <el-menu
        text-color="#9e9c9c"
        background-color="#001529"
        active-text-color="#fff"
        class="home-menu-items"
        :collapse="layoutSettingS.isCollapse"
        :router="true"
        :default-active="route.path"
      >
        <Logo></Logo>
        <el-scrollbar>
          <Menu :menuRoutes="userS.menuRoutes"></Menu>
        </el-scrollbar>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-content-title">
        <Tabbar></Tabbar>
      </el-header>
      <el-main class="home-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import { userStore } from '@/stores/modules/user'
import layoutSettingStore from '@/stores/modules/setting'
import { useRoute } from 'vue-router'

const userS = userStore()
const layoutSettingS = layoutSettingStore()
const route = useRoute()
</script>

<style scoped lang="scss">
.home-container {
  background-color: #eee;
  height: 100vh;
  .home-menu {
    background-color: #001529;
    padding: 10px 0;
    transition: all 0.3s;
    .home-menu-items {
      border: none;
    }
  }
  .home-content-title {
    background-color: #fff;
  }
  .home-content {
    background-color: #eee;
  }
}
</style>

<style lang="scss">
.el-menu--collapse .el-sub-menu__title span {
  display: none;
}
.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none;
}
</style>
