import { createRouter, createWebHistory } from 'vue-router'
import KnightsRouter from '../modules/Knights/router';
import HeroesRouter from "../modules/Heroes/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...KnightsRouter,
    ...HeroesRouter,
  ]
})

export default router
