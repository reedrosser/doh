<template>
  <div>
    <div v-for="listing in listings" v-bind:key="listing.id">
      <stock-listing :listing="listing"/>
    </div>
  </div>
</template>

<script>
import StockListing from "./StockListing.vue";
export default {
  name: "StockList",
  components: {
    StockListing
  },
  props: ["listings"]
};
</script>

<style scoped>
</style>
