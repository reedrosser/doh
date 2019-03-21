<template>
  <div class="about">
    <BackButton/>
    <h2>Resources</h2>
    <a href="https://github.com/highcharts/highcharts-vue#requirements">HighCharts</a>
    <a href="https://iextrading.com/developer/">IEX Cloud</a>
    <a href="https://github.com/highcharts/highcharts-vue#requirements">This Repo</a>
  </div>
</template>

<script>
import BackButton from "../components/BackButton";
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

