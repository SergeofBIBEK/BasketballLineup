import Vue from 'vue';
import Router from 'vue-router';
import Lineups from '@/components/Lineups';
import ViewPage from '@/components/ViewPage';
import Auth from "@/components/Auth";
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },

    {
      path: '/:user',
      name: 'Lineups',
      component: Lineups,
    },
    {
      path: '/:user/:id',
      name: 'ViewPage',
      component: ViewPage
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
});

export default router;