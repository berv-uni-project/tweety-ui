import Vue from "vue";
import Router from "vue-router";
import Search from "./views/search/Search.vue";
import Callback from "./views/callback/Callback.vue";
import Home from "./views/home/Home.vue";
import { authGuard } from "./auth/authGuard";

Vue.use(Router);

var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      beforeEnter: authGuard
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      redirect: "home"
    }
  ]
});

export default router;
