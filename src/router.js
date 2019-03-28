import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/stock-detail/:stockSymbol/:stockName",
      name: "stock-detail",
      props: route => ({
        stockSymbol: route.params.stockSymbol,
        stockName: route.params.stockName
      }),
      component: () => import("./views/StockDetail.vue")
    }
  ]
});
