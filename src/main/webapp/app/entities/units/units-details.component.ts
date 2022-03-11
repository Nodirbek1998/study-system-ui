import { Component, Vue, Inject } from 'vue-property-decorator';

import { IUnits } from '@/shared/model/units.model';
import UnitsService from './units.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class UnitsDetails extends Vue {
  @Inject('unitsService') private unitsService: () => UnitsService;
  @Inject('alertService') private alertService: () => AlertService;

  public units: IUnits = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.unitsId) {
        vm.retrieveUnits(to.params.unitsId);
      }
    });
  }

  public retrieveUnits(unitsId) {
    this.unitsService()
      .find(unitsId)
      .then(res => {
        this.units = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
