import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RaceResults from '../views/RaceResults.vue'

const routes = [
  {
    path: '/',
    redirect: '/home' // 👈 This makes "/" go to "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  { 
    path: '/raceResults', 
    name: 'RaceResults', 
    component: RaceResults 
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

