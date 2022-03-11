import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITestAnswer } from '@/shared/model/test-answer.model';
import TestAnswerService from './test-answer.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TestAnswerDetails extends Vue {
  @Inject('testAnswerService') private testAnswerService: () => TestAnswerService;
  @Inject('alertService') private alertService: () => AlertService;

  public testAnswer: ITestAnswer = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.testAnswerId) {
        vm.retrieveTestAnswer(to.params.testAnswerId);
      }
    });
  }

  public retrieveTestAnswer(testAnswerId) {
    this.testAnswerService()
      .find(testAnswerId)
      .then(res => {
        this.testAnswer = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
