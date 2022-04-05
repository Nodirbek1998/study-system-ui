import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Users = () => import('@/entities/study-users/study-users.vue');
// prettier-ignore
const UsersUpdate = () => import('@/entities/study-users/study-users-update.vue');
// prettier-ignore
const UsersDetails = () => import('@/entities/study-users/study-users-details.vue');
// prettier-ignore
const Role = () => import('@/entities/role/role.vue');
// prettier-ignore
const RoleUpdate = () => import('@/entities/role/role-update.vue');
// prettier-ignore
const RoleDetails = () => import('@/entities/role/role-details.vue');
// prettier-ignore
const StudyLogs = () => import('@/entities/study-logs/study-logs.vue');
// prettier-ignore
const StudyLogsUpdate = () => import('@/entities/study-logs/study-logs-update.vue');
// prettier-ignore
const StudyLogsDetails = () => import('@/entities/study-logs/study-logs-details.vue');
// prettier-ignore
const RoleStaticPermission = () => import('@/entities/role-static-permission/role-static-permission.vue');
// prettier-ignore
const RoleStaticPermissionUpdate = () => import('@/entities/role-static-permission/role-static-permission-update.vue');
// prettier-ignore
const RoleStaticPermissionDetails = () => import('@/entities/role-static-permission/role-static-permission-details.vue');
// prettier-ignore
const Article = () => import('@/entities/article/article.vue');
// prettier-ignore
const ArticleUpdate = () => import('@/entities/article/article-update.vue');
// prettier-ignore
const ArticleDetails = () => import('@/entities/article/article-details.vue');
// prettier-ignore
const Images = () => import('@/entities/images/images.vue');
// prettier-ignore
const ImagesUpdate = () => import('@/entities/images/images-update.vue');
// prettier-ignore
const ImagesDetails = () => import('@/entities/images/images-details.vue');
// prettier-ignore
const Files = () => import('@/entities/files/files.vue');
// prettier-ignore
const FilesUpdate = () => import('@/entities/files/files-update.vue');
// prettier-ignore
const FilesDetails = () => import('@/entities/files/files-details.vue');
// prettier-ignore
const Subjects = () => import('@/entities/subjects/subjects.vue');
// prettier-ignore
const SubjectsUpdate = () => import('@/entities/subjects/subjects-update.vue');
// prettier-ignore
const SubjectsDetails = () => import('@/entities/subjects/subjects-details.vue');
// prettier-ignore
const Units = () => import('@/entities/units/units.vue');
// prettier-ignore
const UnitsUpdate = () => import('@/entities/units/units-update.vue');
// prettier-ignore
const UnitsDetails = () => import('@/entities/units/units-details.vue');
// prettier-ignore
const Groups = () => import('@/entities/groups/groups.vue');
// prettier-ignore
const GroupsUpdate = () => import('@/entities/groups/groups-update.vue');
// prettier-ignore
const GroupsDetails = () => import('@/entities/groups/groups-details.vue');
// prettier-ignore
const Tests = () => import('@/entities/tests/tests.vue');
// prettier-ignore
const TestsUpdate = () => import('@/entities/tests/tests-update.vue');
// prettier-ignore
const TestsDetails = () => import('@/entities/tests/tests-details.vue');
// prettier-ignore
const TestQuestion = () => import('@/entities/test-question/test-question.vue');
// prettier-ignore
const TestQuestionUpdate = () => import('@/entities/test-question/test-question-update.vue');
// prettier-ignore
const TestQuestionDetails = () => import('@/entities/test-question/test-question-details.vue');
// prettier-ignore
const TestAnswer = () => import('@/entities/test-answer/test-answer.vue');
// prettier-ignore
const TestAnswerUpdate = () => import('@/entities/test-answer/test-answer-update.vue');
// prettier-ignore
const TestAnswerDetails = () => import('@/entities/test-answer/test-answer-details.vue');
// prettier-ignore
const Task = () => import('@/entities/task/task.vue');
// prettier-ignore
const TaskUpdate = () => import('@/entities/task/task-update.vue');
// prettier-ignore
const TaskDetails = () => import('@/entities/task/task-details.vue');
// prettier-ignore
const TaskAnswer = () => import('@/entities/task-answer/task-answer.vue');
// prettier-ignore
const TaskAnswerUpdate = () => import('@/entities/task-answer/task-answer-update.vue');
// prettier-ignore
const TaskAnswerDetails = () => import('@/entities/task-answer/task-answer-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/admin',
  component: Entities,
  children: [
    {
      path: 'users',
      name: 'StudyUser',
      component: Users,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'users/new',
      name: 'StudyUserCreate',
      component: UsersUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'users/:studyUsersId/edit',
      name: 'StudyUserEdit',
      component: UsersUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'users/:usersId/view',
      name: 'StudyUserView',
      component: UsersDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role',
      name: 'Role',
      component: Role,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role/new',
      name: 'RoleCreate',
      component: RoleUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role/:roleId/edit',
      name: 'RoleEdit',
      component: RoleUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role/:roleId/view',
      name: 'RoleView',
      component: RoleDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'study-logs',
      name: 'StudyLogs',
      component: StudyLogs,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'study-logs/new',
      name: 'StudyLogsCreate',
      component: StudyLogsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'study-logs/:studyLogsId/edit',
      name: 'StudyLogsEdit',
      component: StudyLogsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'study-logs/:studyLogsId/view',
      name: 'StudyLogsView',
      component: StudyLogsDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-static-permission',
      name: 'RoleStaticPermission',
      component: RoleStaticPermission,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-static-permission/new',
      name: 'RoleStaticPermissionCreate',
      component: RoleStaticPermissionUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-static-permission/:roleStaticPermissionId/edit',
      name: 'RoleStaticPermissionEdit',
      component: RoleStaticPermissionUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-static-permission/:roleStaticPermissionId/view',
      name: 'RoleStaticPermissionView',
      component: RoleStaticPermissionDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article',
      name: 'Article',
      component: Article,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article/new',
      name: 'ArticleCreate',
      component: ArticleUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article/:articleId/edit',
      name: 'ArticleEdit',
      component: ArticleUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article/:articleId/view',
      name: 'ArticleView',
      component: ArticleDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'images',
      name: 'Images',
      component: Images,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'images/new',
      name: 'ImagesCreate',
      component: ImagesUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'images/:imagesId/edit',
      name: 'ImagesEdit',
      component: ImagesUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'images/:imagesId/view',
      name: 'ImagesView',
      component: ImagesDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'files',
      name: 'Files',
      component: Files,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'files/new',
      name: 'FilesCreate',
      component: FilesUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'files/:filesId/edit',
      name: 'FilesEdit',
      component: FilesUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'files/:filesId/view',
      name: 'FilesView',
      component: FilesDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'subjects',
      name: 'Subjects',
      component: Subjects,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'subjects/new',
      name: 'SubjectsCreate',
      component: SubjectsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'subjects/:subjectsId/edit',
      name: 'SubjectsEdit',
      component: SubjectsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'subjects/:subjectsId/view',
      name: 'SubjectsView',
      component: SubjectsDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'units',
      name: 'Units',
      component: Units,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'units/new',
      name: 'UnitsCreate',
      component: UnitsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'units/:unitsId/edit',
      name: 'UnitsEdit',
      component: UnitsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'units/:unitsId/view',
      name: 'UnitsView',
      component: UnitsDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'groups',
      name: 'Groups',
      component: Groups,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'groups/new',
      name: 'GroupsCreate',
      component: GroupsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'groups/:groupsId/edit',
      name: 'GroupsEdit',
      component: GroupsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'groups/:groupsId/view',
      name: 'GroupsView',
      component: GroupsDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tests',
      name: 'Tests',
      component: Tests,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tests/new',
      name: 'TestsCreate',
      component: TestsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tests/:testsId/edit',
      name: 'TestsEdit',
      component: TestsUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'tests/:testsId/view',
      name: 'TestsView',
      component: TestsDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-question',
      name: 'TestQuestion',
      component: TestQuestion,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-question/new',
      name: 'TestQuestionCreate',
      component: TestQuestionUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-question/:testQuestionId/edit',
      name: 'TestQuestionEdit',
      component: TestQuestionUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-question/:testQuestionId/view',
      name: 'TestQuestionView',
      component: TestQuestionDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-answer',
      name: 'TestAnswer',
      component: TestAnswer,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-answer/new',
      name: 'TestAnswerCreate',
      component: TestAnswerUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-answer/:testAnswerId/edit',
      name: 'TestAnswerEdit',
      component: TestAnswerUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'test-answer/:testAnswerId/view',
      name: 'TestAnswerView',
      component: TestAnswerDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task',
      name: 'Task',
      component: Task,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task/new',
      name: 'TaskCreate',
      component: TaskUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task/:taskId/edit',
      name: 'TaskEdit',
      component: TaskUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task/:taskId/view',
      name: 'TaskView',
      component: TaskDetails,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task-answer',
      name: 'TaskAnswer',
      component: TaskAnswer,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task-answer/new',
      name: 'TaskAnswerCreate',
      component: TaskAnswerUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task-answer/:taskAnswerId/edit',
      name: 'TaskAnswerEdit',
      component: TaskAnswerUpdate,
      // meta: { authorities: [Authority.USER] },
    },
    {
      path: 'task-answer/:taskAnswerId/view',
      name: 'TaskAnswerView',
      component: TaskAnswerDetails,
      // meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
