import Vue from "vue";
import Router from "vue-router";
import Search from "./views/search/Search.vue";
import Callback from "./views/callback/Callback.vue";
import Home from "./views/home/Home.vue";
import auth from "./services/auth";

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/search",
      name: "search",
      component: Search
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

router.beforeEach((to, from, next) => {
  if (
    to.path === "/" ||
    to.path === "/callback" ||
    to.path === "/about" ||
    auth.isAuthenticated()
  ) {
    return next();
  }

  // Specify the current path as the customState parameter, meaning it
  // will be returned to the application after auth
  auth.login({ target: to.path });
});

export default router;
