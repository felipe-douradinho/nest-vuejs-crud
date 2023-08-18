import type { RouteRecordRaw } from "vue-router";

const KnightsRouter: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/knights",
    name: "knights-list",
    component: () => import("../components/list/KnightList.vue"),
  },
  {
    path: "/knights/:id/edit",
    name: "knights-edit",
    component: () => import("../components/edit/KnightEdit.vue"),
  },
  {
    path: "/knights/create",
    name: "knights-create",
    component: () => import("../components/create/KnightCreate.vue"),
  },
];

export default KnightsRouter
