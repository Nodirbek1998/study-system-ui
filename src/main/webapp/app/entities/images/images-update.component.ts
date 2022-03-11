import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import { IImages, Images } from '@/shared/model/images.model';
import ImagesService from './images.service';

const validations: any = {
  images: {
    name: {},
    imageSize: {},
    contentType: {},
    createdAt: {},
  },
};

@Component({
  validations,
})
export default class ImagesUpdate extends Vue {
  @Inject('imagesService') private imagesService: () => ImagesService;
  @Inject('alertService') private alertService: () => AlertService;

  public images: IImages = new Images();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.imagesId) {
        vm.retrieveImages(to.params.imagesId);
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
    if (this.images.id) {
      this.imagesService()
        .update(this.images)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Images is updated with identifier ' + param.id;
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
      this.imagesService()
        .create(this.images)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Images is created with identifier ' + param.id;
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

  public retrieveImages(imagesId): void {
    this.imagesService()
      .find(imagesId)
      .then(res => {
        this.images = res;
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
