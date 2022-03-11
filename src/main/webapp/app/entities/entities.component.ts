import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import StudyUsersService from './study-users/study-users.service';
import RoleService from './role/role.service';
import StudyLogsService from './study-logs/study-logs.service';
import RoleStaticPermissionService from './role-static-permission/role-static-permission.service';
import ArticleService from './article/article.service';
import ImagesService from './images/images.service';
import FilesService from './files/files.service';
import SubjectsService from './subjects/subjects.service';
import UnitsService from './units/units.service';
import GroupsService from './groups/groups.service';
import TestsService from './tests/tests.service';
import TestQuestionService from './test-question/test-question.service';
import TestAnswerService from './test-answer/test-answer.service';
import TaskService from './task/task.service';
import TaskAnswerService from './task-answer/task-answer.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('studyUsersService') private studyUsersService = () => new StudyUsersService();
  @Provide('roleService') private roleService = () => new RoleService();
  @Provide('studyLogsService') private studyLogsService = () => new StudyLogsService();
  @Provide('roleStaticPermissionService') private roleStaticPermissionService = () => new RoleStaticPermissionService();
  @Provide('articleService') private articleService = () => new ArticleService();
  @Provide('imagesService') private imagesService = () => new ImagesService();
  @Provide('filesService') private filesService = () => new FilesService();
  @Provide('subjectsService') private subjectsService = () => new SubjectsService();
  @Provide('unitsService') private unitsService = () => new UnitsService();
  @Provide('groupsService') private groupsService = () => new GroupsService();
  @Provide('testsService') private testsService = () => new TestsService();
  @Provide('testQuestionService') private testQuestionService = () => new TestQuestionService();
  @Provide('testAnswerService') private testAnswerService = () => new TestAnswerService();
  @Provide('taskService') private taskService = () => new TaskService();
  @Provide('taskAnswerService') private taskAnswerService = () => new TaskAnswerService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
