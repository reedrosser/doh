<template>
  <div>{{ this.listing.Name }} : {{ this.listing.Symbol }}</div>
</template>

<script>
export default {
  name: "StockListing",
  props: ["listing"]
};
</script>

<style scoped>
</style>

