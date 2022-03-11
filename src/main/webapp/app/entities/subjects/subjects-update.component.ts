import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import GroupsService from '@/entities/groups/groups.service';
import { IGroups } from '@/shared/model/groups.model';

import { ISubjects, Subjects } from '@/shared/model/subjects.model';
import SubjectsService from './subjects.service';

const validations: any = {
  subjects: {
    nameUz: {},
    nameRu: {},
    nameEn: {},
    createdAt: {},
    updatedAt: {},
  },
};

@Component({
  validations,
})
export default class SubjectsUpdate extends Vue {
  @Inject('subjectsService') private subjectsService: () => SubjectsService;
  @Inject('alertService') private alertService: () => AlertService;

  public subjects: ISubjects = new Subjects();

  @Inject('groupsService') private groupsService: () => GroupsService;

  public groups: IGroups[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.subjectsId) {
        vm.retrieveSubjects(to.params.subjectsId);
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
    if (this.subjects.id) {
      this.subjectsService()
        .update(this.subjects)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.subjects.updated', { param: param.id });
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
      this.subjectsService()
        .create(this.subjects)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.subjects.created', { param: param.id });
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

  public retrieveSubjects(subjectsId): void {
    this.subjectsService()
      .find(subjectsId)
      .then(res => {
        this.subjects = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.groupsService()
      .retrieve()
      .then(res => {
        this.groups = res.data;
      });
  }
}
