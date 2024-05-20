<template>
  <div class="consume-container">
    <h1>游客消费数据统计</h1>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const { remSize } = defineProps(['remSize'])
const consumeData = reactive([
  {
    value: [4200, 3000, 20000, 35000, 50000, 18000],
    name: '2023年'
  },
  {
    value: [5000, 14000, 28000, 26000, 42000, 21000],
    name: '2024年'
  }
])

const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    legend: {
      data: consumeData.map((ele) => {
        return ele.name
      }),
      top: 'center',
      right: '2%',
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        fontSize: 0.8 * remSize
      }
    },
    radar: {
      // shape: 'circle',
      center: ['50%', '50%'], //雷达图的中心位置
      radius: '50%', // 半径
      indicator: [
        { name: '门票' },
        { name: '文创' },
        { name: '出行' },
        { name: '美食' },
        { name: '酒店' },
        { name: '特产' }
      ],
      axisName: {
        fontSize: 1 * remSize,
        color: 'gray'
      },
      splitArea: {
        areaStyle: {
          color: ['#dadee9', '#eee'],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: consumeData,
        label: {
          fontSize: 0.8 * remSize,
          fontWeight: 500
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.consume-container {
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
