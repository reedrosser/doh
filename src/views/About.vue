<template>
  <div class="about">
    <BackButton/>
    <h2>Resources</h2>
    <a href="https://github.com/apexcharts/vue-apexcharts">ApexCharts</a>
    <a href="https://iextrading.com/developer/">IEX Cloud</a>
    <a href="https://github.com/reedrosser/doh">D'oh! On GitHub</a>
  </div>
</template>

<script>
import BackButton from "../components/Button/BackButton";
export default {
  name: "About",
  components: {
    BackButton
  }
};
</script>


<style scoped>
.about {
  position: relative;
}
a {
  display: block;
  color: #00a56b;
}
</style>
