import { Component, Vue, Inject } from 'vue-property-decorator';

import { IImages } from '@/shared/model/images.model';
import ImagesService from './images.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ImagesDetails extends Vue {
  @Inject('imagesService') private imagesService: () => ImagesService;
  @Inject('alertService') private alertService: () => AlertService;

  public images: IImages = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.imagesId) {
        vm.retrieveImages(to.params.imagesId);
      }
    });
  }

  public retrieveImages(imagesId) {
    this.imagesService()
      .find(imagesId)
      .then(res => {
        this.images = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
