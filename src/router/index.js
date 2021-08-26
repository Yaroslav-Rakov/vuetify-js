import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/store.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',

    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
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
      path: '/posts',
      name: 'Posts',
      props: true,

        component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
      meta: { requiresAuth: true }

  },
  {
    path: '/my-posts',
    name: 'MyPosts',
    props: true,

      component: () => import(/* webpackChunkName: "MyPosts" */ '../views/MyPosts.vue'),
    meta: { requiresAuth: true }

},
  {
    path: '/post/:id',
    name: 'Post',

    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  console.log('from router store.state.userModule.token', store.state.userModule.token);
  const redirect = to.matched.some(record => record.meta.requiresAuth) && !store.state.userModule.token?
      { name: "Login" }: undefined;

  console.log('redirect', redirect);
  next(redirect);
})

export default router