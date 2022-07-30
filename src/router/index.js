import VueRouter from "vue-router";

import homePage from "@/views/homePage"

import Vue from "vue";

Vue.use(VueRouter);

const routes = [
 {
    path: "/",
    name: "HomePage",
    component : homePage
 }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
