import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/store.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',

        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',

        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
      path: '/posts/:page',
      name: 'Posts',

        component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
      meta: { requiresAuth: true }

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