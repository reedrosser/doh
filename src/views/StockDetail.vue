<template>
  <div>
    <p>{{stockSymbol}}</p>
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  name: "StockDetail",
  data() {
    return {
      stockSymbol: this.$route.params.stockSymbol
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    console.log(`Stock detail created: ${this.stockSymbol}`);
  }
};
</script>

<style scoped>
</style>

