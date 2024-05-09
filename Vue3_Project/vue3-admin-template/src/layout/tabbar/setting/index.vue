<template>
  <el-button :icon="RefreshRight" circle size="small" @click="layoutSettingS.layoutReFresh" />
  <el-button :icon="FullScreen" circle size="small" @click="fullScreenChange" />
  <el-button :icon="Tools" circle size="small" />
  <img
    :src="userS.userAvatar"
    alt="头像"
    style="height: 30px; width: 30px; margin: 0 10px; border-radius: 15px"
  />
  <el-dropdown>
    <span>
      <span>{{ userS.userName }}</span>
      <ElIcon iconName="ArrowDown"></ElIcon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onUserLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import ElIcon from '@/components/ElIcon/index.vue'
import { RefreshRight, FullScreen, Tools } from '@element-plus/icons-vue'
import layoutSettingStore from '@/stores/modules/setting'
import { userStore } from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'

const layoutSettingS = layoutSettingStore()
const userS = userStore()
const route = useRoute()
const router = useRouter()

const fullScreenChange = () => {
  let isFullScreen = document.fullscreenElement
  if (isFullScreen) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
const onUserLogout = async () => {
  //第一件事：需要项服务器发请求【退出登录接口】（我们这里没有）
  //第二件事：仓库当中和关于用户的相关的数据清空
  //第三件事：跳转到登陆页面
  userS.userLogout().then(
    (res) => {
      router.push({ path: '/login', query: { redirect: route.path } })
    },
    (err) => {
      console.log('登录退出失败')
    }
  )
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped lang="scss"></style>
