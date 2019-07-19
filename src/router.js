import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from './services/Firebase';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "current",
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
        return {selector: to.hash}
    } else {
        return { x: 0, y: 0 }
    }
    },
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        protected: true
        },
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        protected: true
        },
      component: () => import( './views/About.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( './views/Login.vue')
      }
  ]
})
router.beforeEach((to, from, next) => {
    if(!to.meta.protected) { //route is public, don't check for authentication
        next()
    } else {  //route is protected, if authenticated, proceed. Else, login
       firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                next()
            } else {
                console.log('me')
                // next('/login')
                window.location.href = '/login'
            }
        })
    }
  });

  export default router;
