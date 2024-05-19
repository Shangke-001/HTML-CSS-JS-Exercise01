<template>
  <div class="rank-container">
    <h1>热门景区排行</h1>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const { remSize } = defineProps(['remSize'])
const rankData = reactive([
  ['万里长城', 254],
  ['北京故宫', 301],
  ['杭州西湖', 277],
  ['洛阳', 139],
  ['九寨沟', 203],
  ['重庆', 119],
  ['长沙', 105],
  ['海南', 318],
  ['澳门', 66]
])

const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    dataset: [
      {
        dimensions: ['name', 'score'],
        source: rankData
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'asc' }
        }
      }
    ],
    xAxis: {
      splitLine: {
        show: false
      },
      //轴线的设置
      axisLine: {
        show: false
      },
      //刻度
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      //轴线的设置
      axisLine: {
        show: false
      },
      //刻度
      axisTick: {
        show: false
      }
    },
    series: {
      type: 'bar',
      encode: { x: 'score', y: 'name' },
      datasetIndex: 1,
      itemStyle: {
        borderRadius: 1 * remSize,
        // 定制显示（按顺序）
        color: function (params: any) {
          var colorList = [
            '#5470c6',
            '#91cc75',
            '#fac858',
            '#ee6666',
            '#73c0de',
            '#5470c6',
            '#91cc75',
            '#fac858',
            '#ee6666',
            '#73c0de'
          ]
          return colorList[params.dataIndex]
        }
      },
      label: {
        show: true,
        position: 'right'
      }
    },
    grid: {
      left: 7.5 * remSize,
      top: 1.5 * remSize,
      right: 3 * remSize,
      bottom: 2.5 * remSize
    }
  })
})
</script>

<style scoped lang="scss">
.rank-container {
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
    flex: 12;
    // background-color: aqua;
  }
}
</style>
