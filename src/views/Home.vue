<template>
  <div id="app">
    <search-stocks v-on:search-stock="getStocks" :emptyListings="emptyListings"/>
    <stock-list :listings="listings"/>
  </div>
</template>

<script>
import axios from "axios";
import SearchStocks from "../components/SearchStocks.vue";
import StockList from "../components/StockList.vue";

export default {
  name: "Home",
  components: {
    SearchStocks,
    StockList
  },
  data() {
    return {
      listings: [],
      emptyListings: false
    };
  },
  methods: {
    getStocks(stockName) {
      console.log("app: " + stockName);
      if (stockName.length > 2) {
        console.log("long enough!");
        axios
          .get(`/stocks?stockName=${stockName}`)
          .then(res => {
            console.log(this.listings.length);
            this.listings = res.data;
            this.emptyListings = this.listings.length < 1 ? true : false;
          })
          .catch(err => console.log(err));
      } else {
        this.emptyListings = true;
      }
    }
  },
  created() {
    axios
      .get("/stocks")
      .then(res => {
        console.log("finished axios");
        this.listings = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
