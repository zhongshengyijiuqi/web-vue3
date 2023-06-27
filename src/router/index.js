import { createRouter, createWebHistory } from 'vue-router'
import homePanel from '../views/homePanelPro/homePanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePanel
    },
    {
      path: '/andonPage',
      name: 'andonPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/andonPage/index.vue')
    }
  ]
})

export default router
