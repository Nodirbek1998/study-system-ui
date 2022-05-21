
const Groups = () => import('@/groups/user-groups.vue');
const OpenGroup = () => import('@/groups/tasks/tasks.vue');

export default [

  {
    path: 'groups',
    name: 'Groups',
    component: Groups,
  // meta: { authorities: [Authority.USER] },
  },

  {
    path: 'groups/open-group/:groupId',
    name: 'OpenGroup',
    component: OpenGroup,
    // meta: { authorities: [Authority.USER] },
  }
]
