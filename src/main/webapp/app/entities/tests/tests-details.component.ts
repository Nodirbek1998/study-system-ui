import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITests } from '@/shared/model/tests.model';
import TestsService from './tests.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TestsDetails extends Vue {
  @Inject('testsService') private testsService: () => TestsService;
  @Inject('alertService') private alertService: () => AlertService;

  public tests: ITests = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.testsId) {
        vm.retrieveTests(to.params.testsId);
      }
    });
  }

  public retrieveTests(testsId) {
    this.testsService()
      .find(testsId)
      .then(res => {
        this.tests = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
