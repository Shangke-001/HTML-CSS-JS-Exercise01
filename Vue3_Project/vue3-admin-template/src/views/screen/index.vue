<template>
  <div class="screen-container" v-if="screenRefresh">
    <div class="top">
      <Top></Top>
    </div>
    <div class="bottom">
      <div class="bottom-item"><Tourist :remSize="remFontsize"></Tourist></div>
      <div class="bottom-item"><Sex :remSize="remFontsize"></Sex></div>
      <div class="bottom-item"><Age :remSize="remFontsize"></Age></div>
      <div class="bottom-item map"><Map :remSize="remFontsize"></Map></div>
      <div class="bottom-item"><Line :remSize="remFontsize"></Line></div>
      <div class="bottom-item"><Rank :remSize="remFontsize"></Rank></div>
      <div class="bottom-item"><Year :remSize="remFontsize"></Year></div>
      <div class="bottom-item"><Consume :remSize="remFontsize"></Consume></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './components/top/index.vue'
import Tourist from './components/bottom/Tourist.vue'
import Sex from './components/bottom/Sex.vue'
import Age from './components/bottom/Age.vue'

import Map from './components/bottom/Map.vue'
import Line from './components/bottom/Line.vue'

import Rank from './components/bottom/Rank.vue'
import Year from './components/bottom/Year.vue'
import Consume from './components/bottom/Consume.vue'

import { nextTick, ref } from 'vue'

let screenRefresh = ref(true)

//rem大小计算
let remFontsize = ref((document.body.clientWidth / 1920) * 16)
document.documentElement.style.fontSize = remFontsize.value + 'px'

document.body.onresize = () => {
  remFontsize.value = (document.body.clientWidth / 1920) * 16
  document.documentElement.style.fontSize = remFontsize.value + 'px'
  // window.location.reload()
  //最好是销毁组件重新挂载
  screenRefresh.value = false
  nextTick(() => {
    screenRefresh.value = true
  })
}
</script>

<style scoped lang="scss">
.screen-container {
  background-color: #eee;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .top {
    flex: 1;
  }
  .bottom {
    flex: 20;
    display: grid;
    margin: 1.5rem 2rem 1.5rem 2rem;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1.5fr 1fr 1fr;
    gap: 2rem;
    grid-auto-flow: column;
    .map {
      grid-row: 1 / 3;
    }
    .bottom-item {
      background-color: rgba($color: #ffffff, $alpha: 0.3);
      border-radius: 1rem;
      box-shadow: 0rem 1.5rem 1.5rem 0rem rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
