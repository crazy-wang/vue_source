import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './myVueRouter'
import Home from '../views/Home.vue'

// 1. 使用vue-router插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 2. 传入routes映射表做为vueRouter的options，创建router实例
const router = new VueRouter({
  routes
})

// 3. 导出路由实例，在根组件上添加实例【在main.js中】
export default router

// 4.添加路由视图router-view【在app.vue【任何有router-view路由出口的地方】中】

