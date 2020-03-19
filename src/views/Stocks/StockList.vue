<template lang="pug">
  div.stock-menu
    el-input.stock-search(v-model="searchValue",placeholder="请输入内容")
    el-menu.stock-list
      el-menu-item.stock-item(v-for="o in 20",:key="o") {{'列表内容 ' + o }}
</template>

<script>

export default {
  name: 'StockList',
  methods: {
  },
  computed: {
  },
  created () {
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
