<template lang="pug">
  #stock-main(ref="stock-main",v-resize="resize")
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'
import { sumBy, slice, defaultsDeep } from 'lodash'

function calculateMA (dayline, dayCount) {
  return dayline.map((item, index) => {
    if (index < dayCount) return '-'
    return Number((sumBy(slice(dayline, index - dayCount, index), 'close') / dayCount).toFixed(2))
  })
}
const option = {
  title: {
    text: '',
    left: 0
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['日K', 'MA20', 'MA60']
  },
  grid: [
    {
      left: '2%',
      right: '0%',
      height: '60%'
    },
    {
      left: '2%',
      right: '0%',
      top: '73%',
      height: '16%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: [],
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: [],
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 98,
      end: 100
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '92%',
      start: 98,
      end: 100
    }
  ],
  series: [
    {
      name: 'K线',
      type: 'candlestick',
      data: [],
      itemStyle: {
        color: '#ec0000',
        color0: '#00da3c',
        borderColor: '#8A0000',
        borderColor0: '#008F28'
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA60',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: []
    }
  ]
}
export default {
  name: 'StockMain',
  props: {
    activeStockId: String
  },
  data () {
    return {
      myChart: null,
      stock: {}
    }
  },
  directives: {
    resize: {
      bind (el, binding) {
        let width = ''; let height = ''
        function isReize () {
          const style = document.defaultView.getComputedStyle(el)
          if (width !== style.width || height !== style.height) {
            binding.value() // 关键
          }
          width = style.width
          height = style.height
        }
        el.__vueSetInterval__ = setInterval(isReize, 300)
      },
      unbind (el) {
        clearInterval(el.__vueSetInterval__)
      }
    }
  },
  watch: {
    activeStockId (id) {
      this.$get({
        url: `stock/${id}`
      }).then(res => {
        this.stock = res.data
      })
    },
    option (data) {
      this.myChart.setOption(data)
    }
  },
  methods: {
    resize () {
      this.myChart.resize()
    }
  },
  computed: {
    stockData () {
      if (!(this.stock.orgin && this.stock.orgin.dayline)) {
        return {}
      }
      const MA20 = calculateMA(this.stock.orgin.dayline, 20)
      const MA60 = calculateMA(this.stock.orgin.dayline, 60)
      return {
        category: this.stock.orgin.dayline.map(({ date }) => moment(date).format('YYYY-MM-DD')),
        values: this.stock.orgin.dayline.map(({ open, close, low, high }) => [open, close, low, high]),
        MA20,
        MA60,
        volumes: this.stock.orgin.dayline.map(({ volume }) => volume)
      }
    },
    option () {
      console.log(this.stockData.volumes)
      return defaultsDeep({
        title: {
          text: this.stock.name
        },
        xAxis: [{
          data: this.stockData.category
        }, {
          data: this.stockData.category
        }],
        series: [{
          data: this.stockData.values
        }, {
          data: this.stockData.MA20
        }, {
          data: this.stockData.MA60
        }, {
          data: this.stockData.volumes
        }]
      }, option)
    }
  },
  mounted () {
    this.myChart = echarts.init(this.$refs['stock-main'])
  }
}
</script>

<style lang="sass" scoped>
#stock-main
  height: 100%
</style>
