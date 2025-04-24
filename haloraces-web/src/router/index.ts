import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RaceResults from '../views/RaceResults.vue'
import Runers from '../views/Runners.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/race-results',
    name: 'RaceResults',
    component: RaceResults,
  },
  {
    path: '/runners',
    name: 'Runners',
    component: Runers,
  },
]

const router = createRouter({
  history: createWebHistory(), // No need for base path if you're using a custom domain
  routes,
})

export default router
