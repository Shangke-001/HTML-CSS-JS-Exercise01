<template>
  <div class="line-container">
    <h1>未来7天游客量趋势图</h1>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const { remSize } = defineProps(['remSize'])
const lineData = reactive([1240, 940, 1646, 179, 2321, 790, 1200])

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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        data: lineData,
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
                color: '#ee6666' // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: '#5470c6' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          opacity: 1
        }
      }
    ],
    grid: {
      left: 5.5 * remSize,
      top: 1.5 * remSize,
      right: 3 * remSize,
      bottom: 3 * remSize
    }
  })
})
</script>

<style scoped lang="scss">
.line-container {
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
    // background-color: aqua;
  }
}
</style>
