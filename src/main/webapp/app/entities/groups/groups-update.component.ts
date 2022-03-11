import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import SubjectsService from '@/entities/subjects/subjects.service';
import { ISubjects } from '@/shared/model/subjects.model';

import { IGroups, Groups } from '@/shared/model/groups.model';
import GroupsService from './groups.service';

const validations: any = {
  groups: {
    name: {},
    createdAt: {},
    updatedAt: {},
  },
};

@Component({
  validations,
})
export default class GroupsUpdate extends Vue {
  @Inject('groupsService') private groupsService: () => GroupsService;
  @Inject('alertService') private alertService: () => AlertService;

  public groups: IGroups = new Groups();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];

  @Inject('subjectsService') private subjectsService: () => SubjectsService;

  public subjects: ISubjects[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.groupsId) {
        vm.retrieveGroups(to.params.groupsId);
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
    this.groups.studyUsers = [];
    this.groups.subjects = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.groups.id) {
      this.groupsService()
        .update(this.groups)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.groups.updated', { param: param.id });
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
      this.groupsService()
        .create(this.groups)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.groups.created', { param: param.id });
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

  public retrieveGroups(groupsId): void {
    this.groupsService()
      .find(groupsId)
      .then(res => {
        this.groups = res;
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
    this.subjectsService()
      .retrieve()
      .then(res => {
        this.subjects = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
