<template>
  <div class="year-container">
    <h1>年度游客量对比</h1>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const { remSize } = defineProps(['remSize'])
const yearData = reactive([
  [1240, 940, 1646, 179, 2321, 790, 1200, 1646, 179, 2321, 790, 1200],
  [2240, 540, 846, 1179, 521, 790, 2200, 2240, 540, 846, 1179, 521],
  [240, 340, 246, 779, 321, 990, 200, 1240, 440, 246, 2179, 921]
])

const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false
      },
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //轴线的设置
      axisLine: {
        show: true
      },
      //刻度
      axisTick: {
        show: true
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      //轴线的设置
      axisLine: {
        show: true
      },
      //刻度
      axisTick: {
        show: true
      }
    },
    series: [
      {
        type: 'line',
        data: yearData[0],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: '#5470c6',
          opacity: 0.4
        },
        lineStyle: {
          color: '#5470c6'
        },
        itemStyle: {
          color: '#5470c6'
        }
      },
      {
        type: 'line',
        data: yearData[1],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: '#ee6666',
          opacity: 0.4
        },
        lineStyle: {
          color: '#ee6666'
        },
        itemStyle: {
          color: '#ee6666'
        }
      },
      {
        type: 'line',
        data: yearData[2],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: '#fac858',
          opacity: 0.4
        },
        lineStyle: {
          color: '#fac858'
        },
        itemStyle: {
          color: '#fac858'
        }
      }
    ],
    grid: {
      left: 4 * remSize,
      top: 1.5 * remSize,
      right: 1.5 * remSize,
      bottom: 3 * remSize
    }
  })
})
</script>

<style scoped lang="scss">
.year-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    flex: 1.2;
    font-size: 1.5rem;
    margin: 0.5rem 1rem;
  }
  .charts {
    flex: 10;
  }
}
</style>
