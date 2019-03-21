<template>
  <div class="container">
    <h2>{{stockSymbol}}</h2>
    <!-- <div class="btn" @click="goBack">Back</div> -->
    <BackButton/>
    <highcharts :options="chartOptions"/>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import { getHistory } from "../services/pricehistory";
import moment from "moment";
import BackButton from "../components/BackButton";

export default {
  name: "StockDetail",
  props: ["stockSymbol", "stockName"],
  components: {
    highcharts: Chart,
    BackButton
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: "line"
        },
        title: {
          text: ""
        },
        subtitle: {
          text: "Last 30 Days"
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: "Average Price in $USD"
          }
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    setDataPoints(data) {
      let dataPoints = [];
      let dataDates = [];
      data.map(point => {
        let tempArray = [point.high, point.low, point.open, point.close].filter(
          val => {
            return val !== undefined;
          }
        );
        let sum = tempArray.reduce((a, b) => a + b, 0);
        let denom = tempArray.length > 0 ? tempArray.length : 1;
        dataPoints.push(sum / denom);
        dataDates.push(moment(point.date).format("MMM-DD"));
      });
      this.chartOptions.series[0].data = dataPoints;
      this.chartOptions.xAxis.categories = dataDates;
    }
  },
  created() {
    this.chartOptions.series[0].name = `${this.stockSymbol}`;
    this.chartOptions.title.text = `${this.stockName}`;
    getHistory(this.stockSymbol, this.setDataPoints);
  }
};
</script>

<style scoped>
.container {
  position: relative;
}
.btn {
  position: absolute;
  top: -10px;
  left: 5px;
}
</style>

