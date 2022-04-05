const Home = () => import('@/pages/home/HomePage.vue');

export default [
  {
    path: '/admin/user-management',
    name: 'JhiUser',
    component: Home,
  }
]
