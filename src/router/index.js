import VueRouter from "vue-router";

import homePage from "@/views/homePage";
import data from "@/views/data";

import Vue from "vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: homePage,
  },
  {
    path: "/data/:name",
    component: data,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
