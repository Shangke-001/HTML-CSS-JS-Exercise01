<template>
  <div class="age-container">
    <h1>年龄比例</h1>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'

const { remSize } = defineProps(['remSize'])
const ageData = reactive([
  { value: 300, name: '10岁以下' },
  { value: 735, name: '10-18岁' },
  { value: 1048, name: '18-30岁' },
  { value: 580, name: '30-50岁' },
  { value: 484, name: '50岁以上' }
])
const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    series: [
      {
        type: 'pie',
        radius: ['50%', '95%'],
        center: ['45%', '50%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: ageData
      }
    ],
    legend: {
      top: 'center',
      right: '2%',
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        fontSize: 0.8 * remSize
      }
    },
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
.age-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    flex: 1.2;
    font-size: 1.5rem;
    margin: 0.5rem 1rem 0 1rem;
  }
  .charts {
    flex: 6;
    // background-color: antiquewhite;
  }
}
</style>
