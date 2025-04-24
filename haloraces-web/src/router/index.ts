import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RaceResults from '../views/RaceResults.vue'
import Runers from '../views/Runners.vue'

const routes = [
  {
    path: '/HaloracesWeb',
    redirect: '/HaloracesWeb/home'
  },
  {
    path: '/HaloracesWeb/home',
    name: 'Home',
    component: Home
  },
  { 
    path: '/HaloracesWeb/race-results', 
    name: 'RaceResults', 
    component: RaceResults 
  },
  { 
    path: '/HaloracesWeb/runners', 
    name: 'Runners', 
    component: Runers 
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

