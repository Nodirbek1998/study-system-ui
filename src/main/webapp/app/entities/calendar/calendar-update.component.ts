import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';


import AlertService from '@/shared/alert/alert.service';
import CalendarService from './calendar.service';
import {Calendar, ICalendar} from "@/shared/calendar.model";

const validations: any = {
  edoCalendar: {
    /* nameUz: {
      required,
      maxLength: maxLength(1000),
    },
    nameRu: {
      required,
      maxLength: maxLength(1000),
    },*/
    nameEn: {
      required,
      maxLength: maxLength(1000),
    },
    showDate: {},
    createdOn: {},
    isDeleted: {},
  },
};

@Component({
  validations,
})
export default class EdoCalendarUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('edoCalendarService') private edoCalendarService: () => CalendarService;
  public edoCalendar: ICalendar = new Calendar();

  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.edoCalendarId) {
        vm.retrieveEdoCalendar(to.params.edoCalendarId);
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
    (<any>this.$root).showLoader(true);

    this.edoCalendar.nameRu = this.edoCalendar.nameEn;
    this.edoCalendar.nameUz = this.edoCalendar.nameEn;

    if (this.edoCalendar.id) {
      this.edoCalendarService()
        .update(this.edoCalendar)
        .then(param => {
          param.nameRu = param.nameEn;
          param.nameUz = param.nameEn;
          (<any>this.$root).showLoader(false);
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('kdbemdocsuiApp.edoCalendar.updated', { param: param.id });
          // this.alertService().showAlert(message, 'info');
        })
        .catch(err => {
          (<any>this.$root).showLoader(false);
          (<any>this.$root).toastError(err.toString());
        });
    } else {
      this.edoCalendarService()
        .create(this.edoCalendar)
        .then(param => {
          console.log(this.edoCalendar);
          param.nameRu = param.nameEn;
          param.nameUz = param.nameEn;
          (<any>this.$root).showLoader(false);
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('kdbemdocsuiApp.edoCalendar.created', { param: param.id });
          // this.alertService().showAlert(message, 'success');
        })
        .catch(err => {
          (<any>this.$root).showLoader(false);
          (<any>this.$root).toastError(err.toString());
        });
    }
  }

  public retrieveEdoCalendar(edoCalendarId): void {
    (<any>this.$root).showLoader(true);
    this.edoCalendarService()
      .find(edoCalendarId)
      .then(res => {
        (<any>this.$root).showLoader(false);
        this.edoCalendar = res;
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastError(err.toString());
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  // public initRelationships(): void {
  //   this.edoCompanyService()
  //     .retrieve()
  //     .then(res => {
  //       this.edoCompanies = res.data;
  //     });
  // }
}
