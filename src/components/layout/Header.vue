<template>
  <header class="header">
    <span class="header-title">D'oh!</span>
    <div id="nav">
      <router-link to="/">Home</router-link>
      {{' |'}}
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header {
  background-color: #00a56b;
  padding: 20px;
}
.header-title {
  font-size: 55px;
  font-weight: 600;
  color: white;
}
a {
  color: white;
}
</style>

