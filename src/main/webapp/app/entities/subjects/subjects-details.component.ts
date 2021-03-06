import { Component, Vue, Inject } from 'vue-property-decorator';

import { ISubjects } from '@/shared/model/subjects.model';
import SubjectsService from './subjects.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class SubjectsDetails extends Vue {
  @Inject('subjectsService') private subjectsService: () => SubjectsService;
  @Inject('alertService') private alertService: () => AlertService;

  public subjects: ISubjects = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.subjectsId) {
        vm.retrieveSubjects(to.params.subjectsId);
      }
    });
  }

  public retrieveSubjects(subjectsId) {
    this.subjectsService()
      .find(subjectsId)
      .then(res => {
        this.subjects = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
