<template>
  <el-card>
    <div class="home-container">
      <img :src="userS.userAvatar" alt="头像" />
      <div class="home-text">
        <h1>{{ getGeneralTime() }}好~ {{ userS.userName }}</h1>
        <h2>{{ setting.projectName }}项目</h2>
      </div>
    </div>
  </el-card>
  <div class="backgroudImg">
    <svg-icon name="welcome" width="700px" height="350px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/modules/user'
import { getGeneralTime } from '@/utils/time'
import setting from '@/setting'
const userS = userStore()
</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  img {
    height: 110px;
    width: 110px;
    margin: 10px 30px 10px 10px;
    border-radius: 50%;
  }
  .home-text {
    h1 {
      font-size: 35px;
      font-weight: 700;
      margin-top: 22px;
    }
    h2 {
      font-size: 15px;
      font-weight: 700;
      color: #bdbdbd;
      margin-top: 25px;
      font-style: italic;
    }
  }
}
.backgroudImg {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
