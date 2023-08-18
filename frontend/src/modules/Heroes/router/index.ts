import type { RouteRecordRaw } from "vue-router";

const HeroesRouter: Array<RouteRecordRaw> = [
  {
    path: "/heroes",
    alias: "/heroes",
    name: "heroes-list",
    component: () => import("../components/list/HeroList.vue"),
  },
];

export default HeroesRouter
