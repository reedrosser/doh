<template>
  <div id="app">
    <SearchBar v-on:search-stock="getStocks" :emptyListings="emptyListings"/>
    <stock-list :listings="listings"/>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/Home/SearchBar.vue";
import StockList from "../components/Home/StockList.vue";

export default {
  name: "Home",
  components: {
    SearchBar,
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
      if (stockName.length > 2) {
        axios
          .get(`/stocks?stockName=${stockName}`)
          .then(res => {
            this.listings = res.data;
            this.emptyListings = this.listings.length < 1 ? true : false;
          })
          .catch(err => console.log(err));
      } else {
        this.emptyListings = true;
      }
    }
  }
};
</script>
