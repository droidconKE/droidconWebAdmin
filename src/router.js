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
      path: '/day-one',
      name: 'day-one',
      meta: {
        protected: true
        },
      component: () => import( './views/DayOne.vue')
    },
    {
        path: '/day-two',
        name: 'day-two',
        meta: {
          protected: true
          },
        component: () => import( './views/DayTwo.vue')
      },
      {
        path: '/schedule/:id/:day',
        name: 'schedule',
        meta: {
          protected: true
          },
        component: () => import( './views/SingleSchedule.vue')
      },
      {
        path: '/speakers',
        name: 'speakers',
        meta: {
          protected: true
          },
        component: () => import( './views/Speakers.vue')
      },
      {
        path: '/agenda',
        name: 'agenda',
        meta: {
          protected: true
          },
        component: () => import( './views/Agenda.vue')
      },
      {
        path: '/feedback',
        name: 'feedback',
        meta: {
          protected: true
          },
        component: () => import( './views/EventFeedback.vue')
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
