<template>
  <div class="map-container">
    <h1>景区实时客流量</h1>
    <div class="charts" ref="echartC"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'

import chinaJSON from '../../images/china.json' //引入中国地图的JSON数据
echarts.registerMap('china', chinaJSON as any) //注册中国地图

const mapData = reactive({
  lines: [
    {
      coords: [
        [116.405285, 39.904989], // 起点
        [119.306239, 26.075302] // 终点
      ],
      lineStyle: {
        color: 'pink'
      }
    },
    {
      coords: [
        [116.405285, 39.904989], // 起点
        [114.298572, 30.584355] // 终点
      ],
      lineStyle: {
        color: '#f4e2e6'
      }
    }
  ],
  dots: [
    [116.405285, 39.904989],
    [119.306239, 26.075302],
    [114.298572, 30.584355]
  ]
})
const { remSize } = defineProps(['remSize'])

const echartC = ref()
onMounted(() => {
  let mycharts = echarts.init(echartC.value)
  mycharts.setOption({
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      left: 2 * remSize,
      top: 1 * remSize,
      right: 2 * remSize,
      bottom: -14 * remSize,

      //地图上的文字的设置
      label: {
        show: false, //文字显示出来
        color: '#1d3377',
        fontSize: 1 * remSize
      },
      //每一个多边形的样式
      borderColor: 'black', //地图区域的边框
      itemStyle: {
        //areaColor: '#dadee9', //地图区域的颜色(没有数据时会按照这个颜色显示)
        borderColor: '#fff', //地图区域的边框
        borderWidth: 0.1 * remSize,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#dadee9' // 0% 处的颜色
            },
            {
              offset: 0.4,
              color: '#73c0de' // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#5470c6' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        opacity: 0.9
      },

      //高亮时
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: '#fac858'
        },
        label: {
          show: true, //文字显示出来
          fontSize: 1.5 * remSize,
          fontWeight: 600,
          color: '#1d3377'
          //zlevel: 12 //？？？这个zindex如何设置？
        }
      }
    },

    series: [
      {
        type: 'lines', //航线的系列
        data: mapData.lines,
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: '#ff4b7a',
          symbolSize: 10,

          period: 6,
          trailLength: 0.7
        },
        lineStyle: { color: '#f4e2e6', width: 3, curveness: 0.3 }
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 1.5 * remSize,
        data: mapData.dots,
        itemStyle: { color: '#ff4b7a' } // 数据点颜色
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.map-container {
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
    flex: 20;
    // background-color: #ffbdbd;
  }
}
</style>
