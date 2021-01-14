import Vue from 'vue';
import Router from 'vue-router';
import Search from './views/search/Search.vue';
import Home from './views/home/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      redirect: 'home'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!router.app.$msalInstance) {
      next('/');
      return;
    }
    const acounts = router.app.$msalInstance.getAllAccounts();
    if (acounts.length === 0) {
      next('/');
      return;
    }
    next();
  }
  else {
    next();
  }
})

export default router;
