
const Groups = () => import('@/groups/group/groups.vue');
const OpenGroup = () => import('@/groups/group/view/group-view.vue');
const UserTasks = () => import('@/groups/tasks/tasks.vue');
const CreateTask = () => import('@/groups/tasks/create/create-tasks.vue');
const ViewTask = () => import('@/groups/tasks/view/task-details.vue');

export default [

  {
    path: '/user/groups',
    name: 'UserGroups',
    component: Groups,
  },
  {
    path: 'user/groups/:groupId/view',
    name: 'OpenGroup',
    component: OpenGroup,
  },
  {
    path: 'user/groups/:unitsId/tasks',
    name: 'UserTasks',
    component: UserTasks,
  },

  {
    path: 'user/groups/:unitsId/tasks/create',
    name: 'CreateTask',
    component: CreateTask,
  },

  {
    path: 'user/groups/:taskId/view',
    name: 'ViewTask',
    component: ViewTask,
  }
]
