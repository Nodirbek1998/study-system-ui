import { Component, Vue, Inject } from 'vue-property-decorator';

import { IStudyLogs } from '@/shared/model/study-logs.model';
import StudyLogsService from './study-logs.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class StudyLogsDetails extends Vue {
  @Inject('studyLogsService') private studyLogsService: () => StudyLogsService;
  @Inject('alertService') private alertService: () => AlertService;

  public studyLogs: IStudyLogs = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.studyLogsId) {
        vm.retrieveStudyLogs(to.params.studyLogsId);
      }
    });
  }

  public retrieveStudyLogs(studyLogsId) {
    this.studyLogsService()
      .find(studyLogsId)
      .then(res => {
        this.studyLogs = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
