import Vue from 'vue'
import Router from 'vue-router'
import HelloWord from '@/components/HelloWord.vue'
import userRoutes from './user'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HelloWord',
      component: HelloWord
    },
    ...userRoutes
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
