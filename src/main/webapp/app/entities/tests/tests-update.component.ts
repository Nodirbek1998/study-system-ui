import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import SubjectsService from '@/entities/subjects/subjects.service';
import { ISubjects } from '@/shared/model/subjects.model';

import { ITests, Tests } from '@/shared/model/tests.model';
import TestsService from './tests.service';
import { EnumTest } from '@/shared/model/enumerations/enum-test.model';

const validations: any = {
  tests: {
    name: {},
    status: {},
    deadline: {},
  },
};

@Component({
  validations,
})
export default class TestsUpdate extends Vue {
  @Inject('testsService') private testsService: () => TestsService;
  @Inject('alertService') private alertService: () => AlertService;

  public tests: ITests = new Tests();

  @Inject('subjectsService') private subjectsService: () => SubjectsService;

  public subjects: ISubjects[] = [];
  public enumTestValues: string[] = Object.keys(EnumTest);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.testsId) {
        vm.retrieveTests(to.params.testsId);
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
    if (this.tests.id) {
      this.testsService()
        .update(this.tests)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Tests is updated with identifier ' + param.id;
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
      this.testsService()
        .create(this.tests)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Tests is created with identifier ' + param.id;
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

  public retrieveTests(testsId): void {
    this.testsService()
      .find(testsId)
      .then(res => {
        this.tests = res;
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
