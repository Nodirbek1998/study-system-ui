import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import { IStudyLogs, StudyLogs } from '@/shared/model/study-logs.model';
import StudyLogsService from './study-logs.service';
import { EnumActionType } from '@/shared/model/enumerations/enum-action-type.model';

const validations: any = {
  studyLogs: {
    operationName: {},
    clientIp: {},
    host: {},
    createdAt: {},
    actionType: {},
  },
};

@Component({
  validations,
})
export default class StudyLogsUpdate extends Vue {
  @Inject('studyLogsService') private studyLogsService: () => StudyLogsService;
  @Inject('alertService') private alertService: () => AlertService;

  public studyLogs: IStudyLogs = new StudyLogs();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];
  public enumActionTypeValues: string[] = Object.keys(EnumActionType);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.studyLogsId) {
        vm.retrieveStudyLogs(to.params.studyLogsId);
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
    if (this.studyLogs.id) {
      this.studyLogsService()
        .update(this.studyLogs)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A StudyLogs is updated with identifier ' + param.id;
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
      this.studyLogsService()
        .create(this.studyLogs)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A StudyLogs is created with identifier ' + param.id;
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

  public retrieveStudyLogs(studyLogsId): void {
    this.studyLogsService()
      .find(studyLogsId)
      .then(res => {
        this.studyLogs = res;
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
}
