<template>
  <div @click="goToStockDetail">{{ this.listing.Name }} : {{ this.listing.Symbol }}</div>
</template>

<script>
export default {
  name: "StockListing",
  props: ["listing"],
  methods: {
    goToStockDetail() {
      console.log("Go to stock: " + this.listing.Symbol);
      this.$router.push({
        name: "stock-detail",
        params: { stockSymbol: this.listing.Symbol }
      });
    }
  }
};
</script>

<style scoped>
</style>

