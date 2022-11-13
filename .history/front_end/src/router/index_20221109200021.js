import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRoot from "@/views/UserRoot";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '../views/UserRoot.vue'),
    children:[
      {
        path: '/FirstPage',
        name: 'FirstPage',
        component: () => import( '../views/User/FirstPage.vue')
      },
      {
        path: '/PaperInformation',
        name: 'PaperInformation',
        component: () => import( '../views/User/PaperInformation.vue')
      },
      {
        path: '/MasterInformation',
        name: 'MasterInformation',
        component: () => import( '../views/User/MasterInformation.vue')
      },
      {
        path: '/PersonalInformation',
        name: 'PersonalInformation',
        component: () => import( '../views/User/PersonalInformation.vue')
      },
      {
        path: '/SearchInformation',
        name: 'SearchInformation',
        component: () => import( '../views/User/SearchInformation.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import( '../views/User/login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import( '../views/User/register.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
