const HomePage = () => import('@/pages/home/HomePage.vue');

export default [
  {
    path: '/home',
    alias: '/',
    name: 'HomePage',
    component: HomePage,
    // meta: { authorities: [Authority.USER, Authority.ADMIN] },
  },
];
