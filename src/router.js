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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/stock-detail/:stockSymbol/:stockName",
      name: "stock-detail",
      props: route => ({
        stockSymbol: route.params.stockSymbol,
        stockName: route.params.stockName
      }),
      // route level code-splitting
      // this generates a separate chunk (stock-detail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "stock-detail" */ "./views/StockDetail.vue")
    }
  ]
});
