<template>
  <el-button :icon="RefreshRight" circle size="small" @click="layoutSettingS.layoutReFresh" />
  <el-button :icon="FullScreen" circle size="small" @click="fullScreenChange" />
  <el-popover title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="themeColor"
          show-alpha
          :predefine="predefineThemeColors"
          @change="setThemeColor"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="isDarkMode"
          inline-prompt
          :active-icon="MoonNight"
          :inactive-icon="Sunny"
          @change="darkModeChange"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button :icon="Tools" circle size="small" />
    </template>
  </el-popover>
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
import { RefreshRight, FullScreen, Tools } from '@element-plus/icons-vue'
import layoutSettingStore from '@/stores/modules/setting'
import { userStore } from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { MoonNight, Sunny } from '@element-plus/icons-vue'

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

//切暗黑模式
let isDarkMode = ref<boolean>(false)
const darkModeChange = () => {
  let html = document.documentElement
  isDarkMode.value ? (html.className = 'dark') : (html.className = '')
}
//切主题色
let themeColor = ref<string>('#409EFF')
const predefineThemeColors = ref([
  '#409EFF',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  'rgba(255, 69, 0, 0.68)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
const setThemeColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', themeColor.value)
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped lang="scss"></style>
