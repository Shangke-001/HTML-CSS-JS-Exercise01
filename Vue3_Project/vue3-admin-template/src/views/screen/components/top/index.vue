<template>
  <div class="top-container">
    <div class="left">
      <div class="btn" @click="gobackHome">返回首页</div>
      <div class="btn">统计报告</div>
    </div>
    <div class="center">
      <div class="title-bg"></div>
      <span>智慧旅游可视化大数据平台</span>
    </div>
    <div class="right">
      <span class="rtime">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import moment from 'moment'
import { ref, onMounted, onUnmounted } from 'vue'

//返回首页
const router = useRouter()
const gobackHome = () => {
  router.push('/home')
}
//获取时间并更新
let timer = ref(0)
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top-container {
  display: flex;
  margin: 1rem 3rem;
  font-size: 1.5rem;
  align-items: end;
  // vertical-align: bottom;
  .left {
    flex: 1;
    display: flex;
    .btn {
      margin-right: 2rem;
      background-color: #fff;
      border-radius: 0.5rem;
      width: 8rem;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
    }
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    position: relative;
    .title-bg {
      background-color: #fff;
      position: absolute;
      width: 40rem;
      height: 10rem;
      z-index: 0;
      border-radius: 6rem;
      top: -5.5rem;
    }
    span {
      font-size: 2.5rem;
      z-index: 5;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: end;
    .rtime {
      color: #686868;
    }
  }
}
</style>
