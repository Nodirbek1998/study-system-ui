import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import SubjectsService from '@/entities/subjects/subjects.service';
import { ISubjects } from '@/shared/model/subjects.model';

import { IUnits, Units } from '@/shared/model/units.model';
import UnitsService from './units.service';

const validations: any = {
  units: {
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
export default class UnitsUpdate extends Vue {
  @Inject('unitsService') private unitsService: () => UnitsService;
  @Inject('alertService') private alertService: () => AlertService;

  public units: IUnits = new Units();

  @Inject('subjectsService') private subjectsService: () => SubjectsService;

  public subjects: ISubjects[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.unitsId) {
        vm.retrieveUnits(to.params.unitsId);
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
    if (this.units.id) {
      this.unitsService()
        .update(this.units)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.units.updated', { param: param.id });
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
      this.unitsService()
        .create(this.units)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.units.created', { param: param.id });
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

  public retrieveUnits(unitsId): void {
    this.unitsService()
      .find(unitsId)
      .then(res => {
        this.units = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.subjectsService()
      .retrieve()
      .then(res => {
        this.subjects = res.data;
      });
  }
}
