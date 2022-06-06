import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/overview',
    name: 'Overview',
    component: resolve => require(['@/views/Overview'], resolve),
  },
  {
    path: '/search',
    name: 'Search',
    component: resolve => require(['@/views/Search'], resolve),
    props: route => ({ query: route.query.q })
  },
  {
    path: '/puzzle',
    name: 'Puzzle',
    component: resolve => require(['@/views/Puzzle'], resolve),
  },
  {
    path: '/solve',
    name: 'PuzzleSolver',
    component: resolve => require(['@/views/PuzzleSolver'], resolve),
  },
  {
    path: '/wanjuxiong',
    name: 'PuzzleSolverExt',
    component: resolve => require(['@/views/PuzzleSolverExt'], resolve),
  },
  {
    path: '/solve2',
    name: 'solve2',
    component: resolve => require(['@/views/PuzzleSolver2'], resolve),
  },
  {
    path: '/solve3',
    name: 'solve3',
    component: resolve => require(['@/views/PuzzleSolver3'], resolve),
  },
  {
    path: '/wanjuxiong6',
    name: 'PuzzleSolver6',
    component: resolve => require(['@/views/PuzzleSolver6'], resolve),
  },
  {
    path: '/chart',
    name: 'Chart',
    component: resolve => require(['@/views/RandomChart'], resolve),
  },
  {
    path: '/jujiuwu',
    name: 'boss',
    component: resolve => require(['@/views/Boss'], resolve),
  },
]

const router = new VueRouter({
  routes
})

export default router
