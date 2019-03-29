<template>
  <div class="container">
    <h2>{{stockSymbol}}</h2>
    <h3>{{stockName}}</h3>
    <BackButton/>
    <apexChart
      class="chart"
      width="100%"
      :type="chartType"
      :options="chartOptions"
      :series="series"
      ref="detailChart"
    ></apexChart>
    <BasicButton
      @callbacked="switchCharts"
      class="wideButton"
    >Show {{this.chartType === 'line' ? 'Candlestick Chart' : 'Line Chart'}}</BasicButton>
  </div>
</template>

<script>
import apexChart from "vue-apexcharts";
import { getHistory } from "../services/pricehistory";
import moment from "moment";
import BackButton from "../components/Button/BackButton";
import BasicButton from "../components/Button/BasicButton";

export default {
  name: "StockDetail",
  props: ["stockSymbol", "stockName"],
  components: {
    BackButton,
    apexChart,
    BasicButton
  },

  data() {
    return {
      showDefaultGraph: true,
      chartType: "line",
      usedBothCharts: false,
      chartOptions: {
        chart: {
          id: "vuechart-stock"
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
      ],
      secondaryData: []
    };
  },
  methods: {
    switchCharts() {
      if (this.chartType === "line") {
        this.chartType = "candlestick";
      } else {
        this.chartType = "line";
      }
      //   if both charts have been generated then swap the data
      if (this.usedBothCharts) {
        [this.series[0].data, this.secondaryData] = [
          this.secondaryData,
          this.series[0].data
        ];
      } else {
        this.usedBothCharts = true;
        this.setDataPoints(this.secondaryData);
      }
    },
    setDataPoints(data) {
      // if we haven't used both charts yet, then put the raw data into the secondary Data
      if (!this.usedBothCharts) {
        this.secondaryData = data;
      } else {
        this.secondaryData = this.series[0].data;
      }
      this.series[0].data = [];

      data.map(point => {
        //   variables to calculate average
        let sum, denom, avg;
        // Temporary object to push to the series data array
        let tempObj = { x: point.date };
        //   [O, H, L, C]
        let tempArray = [point.open, point.high, point.low, point.close];

        if (this.chartType === "line") {
          // If any of the values are undefined, remove them from the array
          tempArray = tempArray.filter(val => {
            return val !== undefined;
          });
          sum = tempArray.reduce((a, b) => a + b, 0) || 0;
          denom = tempArray.length > 0 ? tempArray.length : 1;
          avg = sum / denom;
          tempObj.y = avg;
        } else {
          tempObj.y = tempArray;
        }
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
.wideButton {
  width: 80%;
  margin: 0 auto;
}
.container {
  position: relative;
}

.chart {
  max-width: 700px;
  margin: 0 auto;
}
</style>