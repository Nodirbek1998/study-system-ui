import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITestQuestion } from '@/shared/model/test-question.model';
import TestQuestionService from './test-question.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TestQuestionDetails extends Vue {
  @Inject('testQuestionService') private testQuestionService: () => TestQuestionService;
  @Inject('alertService') private alertService: () => AlertService;

  public testQuestion: ITestQuestion = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.testQuestionId) {
        vm.retrieveTestQuestion(to.params.testQuestionId);
      }
    });
  }

  public retrieveTestQuestion(testQuestionId) {
    this.testQuestionService()
      .find(testQuestionId)
      .then(res => {
        this.testQuestion = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
