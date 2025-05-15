import { createRouter, createWebHashHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import RaceResults from '../views/RaceResults.vue'
import Runers from '../views/Runners.vue'
import ServiceRecord from '../views/ServiceRecord.vue'

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
  {
    path: '/service-record/:username',
    name: 'ServiceRecord', // <-- THIS MUST BE A STRING
    component: ServiceRecord,
    props: true,
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    return { top: 0 };
  }
});


export default router
