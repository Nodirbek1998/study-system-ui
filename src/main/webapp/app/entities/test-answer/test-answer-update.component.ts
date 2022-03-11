import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import { ITestAnswer, TestAnswer } from '@/shared/model/test-answer.model';
import TestAnswerService from './test-answer.service';

const validations: any = {
  testAnswer: {
    createdAt: {},
    updatedAt: {},
    right: {},
  },
};

@Component({
  validations,
})
export default class TestAnswerUpdate extends Vue {
  @Inject('testAnswerService') private testAnswerService: () => TestAnswerService;
  @Inject('alertService') private alertService: () => AlertService;

  public testAnswer: ITestAnswer = new TestAnswer();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.testAnswerId) {
        vm.retrieveTestAnswer(to.params.testAnswerId);
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
    this.testAnswer.studyUsers = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.testAnswer.id) {
      this.testAnswerService()
        .update(this.testAnswer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TestAnswer is updated with identifier ' + param.id;
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
      this.testAnswerService()
        .create(this.testAnswer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TestAnswer is created with identifier ' + param.id;
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

  public retrieveTestAnswer(testAnswerId): void {
    this.testAnswerService()
      .find(testAnswerId)
      .then(res => {
        this.testAnswer = res;
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
