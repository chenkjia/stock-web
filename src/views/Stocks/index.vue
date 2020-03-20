<template lang="pug">
  el-container#app-container
    el-aside(width="200px")
      StockList(@changeActiveStockSymbol="changeActiveStockSymbol")
    el-main
      StockMain(:activeStockSymbol="activeStockSymbol")
</template>

<script>
import StockList from './StockList'
import StockMain from './StockMain'

export default {
  name: 'AppFrame',
  components: {
    StockList,
    StockMain
  },
  data () {
    return {
      activeStockSymbol: ''
    }
  },
  methods: {
    changeActiveStockSymbol (symbol) {
      this.activeStockSymbol = symbol
    }
  }
}
</script>

<style lang="sass" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #2c3e50
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
#app-container
  height: 100%
</style>
