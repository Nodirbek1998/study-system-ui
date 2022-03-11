import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import TestsService from '@/entities/tests/tests.service';
import { ITests } from '@/shared/model/tests.model';

import { ITestQuestion, TestQuestion } from '@/shared/model/test-question.model';
import TestQuestionService from './test-question.service';

const validations: any = {
  testQuestion: {
    name: {},
    level: {},
    answerA: {},
    answerB: {},
    answerC: {},
    answerD: {},
  },
};

@Component({
  validations,
})
export default class TestQuestionUpdate extends Vue {
  @Inject('testQuestionService') private testQuestionService: () => TestQuestionService;
  @Inject('alertService') private alertService: () => AlertService;

  public testQuestion: ITestQuestion = new TestQuestion();

  @Inject('testsService') private testsService: () => TestsService;

  public tests: ITests[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.testQuestionId) {
        vm.retrieveTestQuestion(to.params.testQuestionId);
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
    if (this.testQuestion.id) {
      this.testQuestionService()
        .update(this.testQuestion)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.testQuestion.updated', { param: param.id });
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
      this.testQuestionService()
        .create(this.testQuestion)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.testQuestion.created', { param: param.id });
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

  public retrieveTestQuestion(testQuestionId): void {
    this.testQuestionService()
      .find(testQuestionId)
      .then(res => {
        this.testQuestion = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.testsService()
      .retrieve()
      .then(res => {
        this.tests = res.data;
      });
  }
}
