import {createRouter, createWebHistory} from 'vue-router'
import routes from './routers'

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  console.log('路由守卫', to, from);
  next()
})

export default router