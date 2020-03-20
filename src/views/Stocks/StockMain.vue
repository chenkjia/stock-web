<template lang="pug">
  div {{activeStockSymbol}}
</template>

<script>

export default {
  name: 'StockMain',
  props: {
    activeStockSymbol: String
  },
  methods: {
  },
  computed: {
  },
  created () {
  }
}
</script>

<style lang="sass" scoped>
</style>
