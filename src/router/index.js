import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import store from '../store/store.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',

        component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',

        component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
    },
    {
      path: '/posts',
      name: 'Posts',

      component: () => import(/* webpackChunkName: "login" */ '../components/Posts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('from router store.state.token', store.state.token);
  const redirect = to.matched.some(record => record.meta.requiresAuth) && !store.state.token?
      { name: "Login" }: undefined;

  console.log('redirect', redirect);
  next(redirect);
})

export default router