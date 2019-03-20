<template>
  <form @submit="searchStock">
    <input type="text" v-model="searchTerm" name="searchTerm" placeholder="Search Stock...">
    <input type="submit" value="submit">
    <p
      :class="[this.badSearch ? 'badSearch' : 'goodSearch']"
    >Search must be longer than 3 characters</p>
    <p v-if="emptyListings">Sorry, there were no results for that name</p>
  </form>
</template>

<script>
export default {
  name: "SearchStocks",
  props: ["emptyListings"],
  data() {
    return {
      searchTerm: "",
      badSearch: false
    };
  },
  methods: {
    searchStock(e) {
      e.preventDefault();
      if (this.searchTerm.length > 2) {
        console.log("search vue: " + this.searchTerm);
        this.$emit("search-stock", this.searchTerm);
        this.searchTerm = "";
        this.badSearch = false;
      } else {
        this.badSearch = true;
      }
    }
  }
};
</script>

<style scoped>
.badSearch {
  display: block;
  color: red;
}
.goodSearch {
  display: none;
}
</style>


