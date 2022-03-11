import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStudyUsers } from '@/shared/model/study-users.model';
import StudyUsersService from './study-users.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class StudyUsersDetails extends Vue {
  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;
  @Inject('alertService') private alertService: () => AlertService;

  public studyUsers: IStudyUsers = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.studyUsersId) {
        vm.retrieveStudyUsers(to.params.studyUsersId);
      }
    });
  }

  public retrieveStudyUsers(studyUsersId) {
    this.studyUsersService()
      .find(studyUsersId)
      .then(res => {
        this.studyUsers = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
