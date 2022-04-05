import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import RoleService from '@/entities/role/role.service';
import { IRole } from '@/shared/model/role.model';

import GroupsService from '@/entities/groups/groups.service';
import { IGroups } from '@/shared/model/groups.model';

import TestAnswerService from '@/entities/test-answer/test-answer.service';
import { ITestAnswer } from '@/shared/model/test-answer.model';

import TaskAnswerService from '@/entities/task-answer/task-answer.service';
import { ITaskAnswer } from '@/shared/model/task-answer.model';

import { IStudyUsers, StudyUsers } from '@/shared/model/study-users.model';
import StudyUsersService from './study-users.service';

const validations: any = {
  studyUsers: {
    firstName: {},
    lastName: {},
    age: {},
    phone: {},
    email: {},
    login: {},
    password: {},
  },
};

@Component({
  validations,
})
export default class StudyUsersUpdate extends Vue {
  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;
  @Inject('alertService') private alertService: () => AlertService;

  public studyUsers: IStudyUsers = new StudyUsers();

  @Inject('roleService') private roleService: () => RoleService;

  public roles: IRole[] = [];

  @Inject('groupsService') private groupsService: () => GroupsService;

  public groups: IGroups[] = [];

  @Inject('testAnswerService') private testAnswerService: () => TestAnswerService;

  public testAnswers: ITestAnswer[] = [];

  @Inject('taskAnswerService') private taskAnswerService: () => TaskAnswerService;

  public taskAnswers: ITaskAnswer[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.studyUsersId) {
        vm.retrieveStudyUsers(to.params.studyUsersId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.studyUsers.id) {
      this.studyUsersService()
        .update(this.studyUsers)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.studyUsers.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.studyUsersService()
        .create(this.studyUsers)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.studyUsers.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveStudyUsers(studyUsersId): void {
    this.studyUsersService()
      .find(studyUsersId)
      .then(res => {
        this.studyUsers = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.roleService()
      .retrieve()
      .then(res => {
        this.roles = res.data;
      });
    this.groupsService()
      .retrieve()
      .then(res => {
        this.groups = res.data;
      });
    this.testAnswerService()
      .retrieve()
      .then(res => {
        this.testAnswers = res.data;
      });
    this.taskAnswerService()
      .retrieve()
      .then(res => {
        this.taskAnswers = res.data;
      });
  }
}
