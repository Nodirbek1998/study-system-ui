import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import { ITaskAnswer, TaskAnswer } from '@/shared/model/task-answer.model';
import TaskAnswerService from './task-answer.service';

const validations: any = {
  taskAnswer: {
    createdAt: {},
    updatedAt: {},
  },
};

@Component({
  validations,
})
export default class TaskAnswerUpdate extends Vue {
  @Inject('taskAnswerService') private taskAnswerService: () => TaskAnswerService;
  @Inject('alertService') private alertService: () => AlertService;

  public taskAnswer: ITaskAnswer = new TaskAnswer();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskAnswerId) {
        vm.retrieveTaskAnswer(to.params.taskAnswerId);
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
    this.taskAnswer.studyUsers = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.taskAnswer.id) {
      this.taskAnswerService()
        .update(this.taskAnswer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.taskAnswer.updated', { param: param.id });
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
      this.taskAnswerService()
        .create(this.taskAnswer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.taskAnswer.created', { param: param.id });
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

  public retrieveTaskAnswer(taskAnswerId): void {
    this.taskAnswerService()
      .find(taskAnswerId)
      .then(res => {
        this.taskAnswer = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.studyUsersService()
      .retrieve()
      .then(res => {
        this.studyUsers = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
