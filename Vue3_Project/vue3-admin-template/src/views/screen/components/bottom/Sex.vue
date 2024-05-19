<template>
  <div class="sex-container">
    <h1>男女比例</h1>
    <div class="images">
      <div class="mi">
        <img src="../../images/man.png" class="man-img" />
        <div>男士{{ sexData.manPercent }}%</div>
      </div>
      <div class="wi">
        <img src="../../images/woman.png" class="woman-img" />
        <div>女士{{ sexData.womanPercent }}%</div>
      </div>
    </div>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, reactive } from 'vue'

const { remSize } = defineProps(['remSize'])

const sexData = reactive({
  manPercent: 58,
  womanPercent: 0
})
sexData.womanPercent = 100 - sexData.manPercent
const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    // //标题组件
    // title: {
    //   text: '男女比例',
    //   left: '40%',
    //   textStyle: {
    //     // 文本样式
    //     fontSize: 1.2 * remSize,
    //     fontWeight: 600,
    //     color: 'black'
    //   }
    // },
    //x|y轴组件
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        data: [sexData.manPercent],
        barWidth: 1.5 * remSize,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 1 * remSize
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 1.5 * remSize,
        z: 1,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 1 * remSize
        }
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.sex-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    flex: 1.2;
    font-size: 1.5rem;
    margin: 0.5rem 1rem;
  }
  .images {
    flex: 9;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .mi {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: cover;
      .man-img {
        height: 60%;
      }
      div {
        margin-bottom: 0.5rem;
      }
    }
    .wi {
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: cover;
      .woman-img {
        height: 60%;
      }
      div {
        margin-bottom: 0.5rem;
      }
    }
  }
  .charts {
    flex: 6;
    // background-color: aqua;
  }
}
</style>
