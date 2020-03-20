<template lang="pug">
  div.stock-menu
    el-input.stock-search(v-model="searchValue",placeholder="请输入内容")
    el-menu.stock-list(@select="handleSelect")
      el-menu-item.stock-item(
        v-for="stock in resultStockList"
        :key="stock.symbol"
        :index="stock.symbol") {{ `${stock.symbol} ${stock.name}` }}
</template>

<script>

export default {
  name: 'StockList',
  data () {
    return {
      searchValue: '',
      stockList: []
    }
  },
  methods: {
    handleSelect (symbol) {
      this.$emit('changeActiveStockSymbol', symbol)
    }
  },
  computed: {
    resultStockList () {
      return this.searchValue === '' ? this.stockList : this.stockList.filter(stock => {
        return stock.name.indexOf(this.searchValue) > -1 || stock.symbol.indexOf(this.searchValue) > -1
      })
    }
  },
  created () {
    this.$get({ url: '/stock?select=name symbol' }).then(res => {
      this.stockList = res.data
    })
  }
}
</script>

<style lang="sass" scoped>
.stock-menu
  height: 100%
  display: flex
  flex-direction: column
.stock-list
  flex: 1
  overflow: auto
.stock-item
  height: 36px
  line-height: 36px
</style>
