<template>
  <div>
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
    </form>
    <p
      :class="[this.badSearch ? 'badSearch' : 'goodSearch']"
    >Search must be longer than 3 characters</p>
    <p v-if="emptyListings  && !badSearch">Sorry, there were no results for {{searchDetail}}</p>
    <p v-if="!emptyListings && (searchDetail)">Search results for: {{searchDetail}}</p>
  </div>
</template>

<script>
import _ from "lodash";
import BasicButton from "../Button/BasicButton";

export default {
  name: "SearchBar",
  props: ["emptyListings"],
  components: {
    BasicButton
  },
  data() {
    return {
      searchTerm: "",
      badSearch: false,
      lastSearch: "",
      searchDetail: ""
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
      this.searchDetail = this.lastSearch || this.searchTerm;
    },
    onChange: _.debounce(function() {
      this.lastSearch = "";
      if (this.searchTerm.length > 2) {
        this.searchStock();
      }
    }, 500)
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
</style>


