import { Component, Inject, PropSync, Vue } from 'vue-property-decorator';
import TranslationService from '@/locale/translation.service';
import AccountService from '@/account/account.service';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import ImagesService from "@/entities/images/images.service";
import UserService from "@/entities/user/user.service";
import {StudyUsers} from "@/shared/model/study-users.model";

@Component({
  components: {
    VueCropper,
  },
})
export default class UserAvatarComponent extends Vue {
  @Inject('edoUsersService') private userService: () => UserService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('imageService') private imageService: () => ImagesService;

  @PropSync('tabItem', { type: Number }) currentTabItem!: number;
  @PropSync('selectedUser', { type: Object }) selectUsers!: StudyUsers;

  public imageFile = null;
  public imageFileUrl = null;
  public cropImageBlob = null;
  public cropImageUrl = null;

  public cropOptions = {
    left: 0,
    top: 0,
    width: 300,
    height: 300,
  };

  created(): void {
    const imgUrl = this.selectUsers.imageUrl;
    if (imgUrl) {
      this.imageFileUrl = this.imageService().getCurrUserAvatarUrl(imgUrl);
    }
  }

  public nextState(tabId): void {
    this.$emit('nextState', tabId);
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public fasterPreview(event): void {
    if (event && event.target.files && event.target.files[0]) {
      const imgurl = window.URL.createObjectURL(event.target.files[0]);
      if (this.imageFileUrl) {
        (<any>this.$refs.cropper).replace(imgurl, false);
      } else {
        this.imageFileUrl = imgurl;
      }
    }
  }

  public onCropReady(event): void {
    console.log('crop ready', event);
    (<any>this.$refs.cropper).setCropBoxData(this.cropOptions);
    (<any>this.$refs.cropper).setCanvasData(this.cropOptions);
    (<any>this.$refs.cropper).getContainerData(this.cropOptions);
  }

  public cropImage(event): void {
    event.preventDefault();
    (<any>this.$refs.cropper).initCrop();
    const getCanvasData = (<any>this.$refs.cropper).getCroppedCanvas();
    getCanvasData.toBlob(blob => {
      this.cropImageBlob = blob;
      this.cropImageUrl = window.URL.createObjectURL(blob);
      this.uploadFile();
    });
    console.log('crop image', getCanvasData);
  }

  public uploadFile(): void {
    if (this.cropImageBlob) {
      this.imageService()
        .uploadImage(this.cropImageBlob, '1')
        .then(res => {
          this.selectUsers.imageUrl = res.id + '';
          this.$emit('saveUserAvatar', res.id);
        });
    }
  }
}
