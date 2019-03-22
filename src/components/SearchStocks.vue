<template>
  <form class="searchForm" @submit="searchStock">
    <input
      type="text"
      class="searchBox"
      v-model="searchTerm"
      name="searchTerm"
      placeholder="Enter a Stock Name..."
      @input="onChange"
      autocomplete="off"
    >
    <BasicButton callback="searchStock">SUBMIT</BasicButton>
    <p
      :class="[this.badSearch ? 'badSearch' : 'goodSearch']"
    >Search must be longer than 3 characters</p>
    <p v-if="emptyListings">Sorry, there were no results for that name</p>
    <p v-if="lastSearch">Search results for: {{lastSearch}}</p>
  </form>
</template>

<script>
import BasicButton from "./BasicButton";

export default {
  name: "SearchStocks",
  props: ["emptyListings"],
  components: {
    BasicButton
  },
  data() {
    return {
      searchTerm: "",
      badSearch: false,
      lastSearch: ""
    };
  },
  methods: {
    searchStock(e) {
      let clear = false;
      if (e !== undefined) {
        e.preventDefault();
        clear = true;
      }
      if (this.searchTerm.length > 2) {
        this.$emit("search-stock", this.searchTerm);
        if (clear) {
          this.lastSearch = this.searchTerm;
          this.searchTerm = "";
        }
        this.badSearch = false;
      } else {
        this.badSearch = true;
      }
    },
    onChange() {
      this.lastSearch = "";
      if (this.searchTerm.length > 2) {
        this.searchStock();
      }
    }
  }
};
</script>

<style scoped>
.searchForm {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.badSearch {
  display: block;
  color: #c81d25;
}
.goodSearch {
  display: none;
}
.searchBox {
  font-size: 16px;
  display: inline-block;
  width: 80%;
  border-radius: 5px;
  border: solid 2px #e1e6ef;
  height: 40px;
}
.btn {
  display: inline-block;
  margin-left: 10px;
}
@media only screen and (max-width: 468px) {
  .btn {
    margin-top: 10px;
  }
}
</style>


