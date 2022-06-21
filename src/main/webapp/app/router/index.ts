import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router, { RouteConfig } from 'vue-router';

const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import entities from '@/router/entities';
import pages from '@/router/pages';
import home from "@/router/home";
import groups from '@/router/groups';
import article from "@/router/article";
import units from "@/router/units";
import examples from "@/router/examples";


const MainLayout = () => import('@/main-layout.vue');
const Login = () => import('@/pages/auth/auth.page2.vue');


Vue.use(Router);

// prettier-ignore
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        ...pages,
        ...account,
        entities,
        ...admin,
        ...home,
        ...groups,
        ...article,
        ...units,
        ...examples
      ]
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
  ]
});

export default router;
