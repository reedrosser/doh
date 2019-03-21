<template>
  <div class="container">
    <h2>{{stockSymbol}}</h2>
    <h3>{{stockName}}</h3>
    <BackButton/>
    <!-- <highcharts v-if="showGraph" :options="chartOptions"/> -->
    <!-- <div v-else>I am Candelstick Chart</div> -->
    <apexChart
      class="chart"
      width="100%"
      type="candlestick"
      :options="chartOptions"
      :series="series"
    ></apexChart>
    <button @click="switchCharts">Show {{this.showGraph? 'Candlestick Chart' : 'Line Chart'}}</button>
    <BasicButton :callback="doLogs">Content Here</BasicButton>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import apexChart from "vue-apexcharts";
import { getHistory } from "../services/pricehistory";
import moment from "moment";
import BackButton from "../components/BackButton";
import BasicButton from "../components/BasicButton";

export default {
  name: "StockDetail",
  props: ["stockSymbol", "stockName"],
  components: {
    highcharts: Chart,
    BackButton,
    apexChart,
    BasicButton
  },

  data() {
    return {
      showGraph: true,
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          type: "datetime"
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#00a56b",
              downward: "#c81d25"
            }
          }
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
    //   chartOptions: {
    //     chart: {
    //       type: "line"
    //     },
    //     title: {
    //       text: ""
    //     },
    //     subtitle: {
    //       text: "Last 30 Days"
    //     },
    //     xAxis: {
    //       categories: []
    //     },
    //     yAxis: {
    //       title: {
    //         text: "Average Price in $USD"
    //       }
    //     },
    //     series: [
    //       {
    //         name: "",
    //         data: []
    //       }
    //     ]
    //   }
    // };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    doLogs() {
      console.log("basic!");
    },
    switchCharts() {
      this.showGraph = !this.showGraph;
      console.log("showGraph: " + this.showGraph);
    },
    setDataPoints(data, graph = false) {
      data.map(point => {
        let tempArray = [point.open, point.high, point.low, point.close];
        tempArray = tempArray.filter(val => {
          return val !== undefined;
        });
        let sum = tempArray.reduce((a, b) => a + b, 0) || 0;
        console.log(`sum: ${sum}`);
        let denom = tempArray.length > 0 ? tempArray.length : 1;
        let avg = sum / denom;
        console.log(`average: ${avg}`);
        let tempObj = { x: point.date, y: graph ? avg : tempArray };
        console.log(tempObj);
        this.series[0].data.push(tempObj);
      });
    }
  },
  created() {
    this.series[0].name = `${this.stockSymbol}`;
    getHistory(this.stockSymbol, this.setDataPoints);
  }
};
</script>

<style scoped>
.container {
  position: relative;
}

.chart {
  margin: 0 auto;
  /* border: solid 1px red; */
}
</style>

