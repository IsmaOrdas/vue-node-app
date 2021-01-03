import { createRouter, createWebHistory } from "vue-router";
import store from '@/store';
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn";
import SignUp from "../views/Signup";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      requiresAuth: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["user/isLoggedIn"]) {
      next({ name: 'SignIn' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
