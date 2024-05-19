<template>
  <div class="tourist-container">
    <h1>实时游客统计</h1>
    <div class="tourist2">可预约总量 {{ touristData.totalPersons }} 人</div>
    <div class="tourist3">
      <div class="t3item" v-for="(s, index) of touristData.nowPersonStr" :key="index">{{ s }}</div>
    </div>
    <div class="tourist-chart" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const { remSize } = defineProps(['remSize'])

const touristData = reactive({
  totalPersons: 99999,
  nowPersons: 215908,
  nowPersonStr: '',
  perscent: [0.6, 0.4, 0.2]
})
touristData.nowPersonStr = touristData.nowPersons.toString() + '人'

const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    //标题组件
    // title: {
    //   text: '水球图'
    // },
    //x|y轴组件
    // xAxis: {},
    // yAxis: {},
    series: [
      {
        type: 'liquidFill',
        data: touristData.perscent,
        radius: '85%',
        outline: {
          show: true,
          borderDistance: 0.5 * remSize, // 边框线与图表的距离 数字
          itemStyle: {
            opacity: 1, // 边框的透明度   默认为 1
            borderWidth: 0.5 * remSize, // 边框的宽度
            shadowBlur: 0.5 * remSize, // 边框的阴影范围 一旦设置了内外都有阴影
            shadowColor: '#fff' // 边框的阴影颜色
          }
        },
        label: {
          fontSize: 3 * remSize,
          fontWeight: 600
        }
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.tourist-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    flex: 1.2;
    font-size: 1.5rem;
    margin: 0.5rem 1rem;
  }
  .tourist2 {
    flex: 1.2;
    text-align: right;
    font-size: 1.2rem;
    margin-right: 1rem;
    color: gray;
  }
  .tourist3 {
    flex: 2;
    display: flex;
    justify-content: space-evenly;
    .t3item {
      width: 3.2rem;
      height: 2.8rem;
      font-size: 1.5rem;
      background-color: #fff;
      box-shadow: 0rem 0.5rem 0rem 0rem rgba(0, 0, 0, 0.08);
      text-align: center;
      line-height: 2.8rem;
      border-radius: 0.5rem;
    }
  }
  .tourist-chart {
    flex: 10;
    //background-color: skyblue;
  }
}
</style>
