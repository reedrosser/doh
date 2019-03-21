<template>
  <div
    class="stockListing"
    @click="goToStockDetail"
  >{{ this.listing.Name }} : {{ this.listing.Symbol }}</div>
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
        params: {
          stockSymbol: this.listing.Symbol,
          stockName: this.listing.Name
        }
      });
    }
  }
};
</script>

<style scoped>
.stockListing {
  padding: 10px 0;
}
.stockListing:hover {
  cursor: pointer;
  animation: fadein 0.5s;
  background-color: #00a56b;
  color: white;
}

@keyframes fadein {
  from {
    background-color: transparent;
  }
  to {
    background-color: #00a56b;
    color: white;
  }
}
</style>

