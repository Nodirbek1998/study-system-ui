import { Component, Vue, Inject } from 'vue-property-decorator';

import { maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import {IArticle, Article, EnumArticle} from '@/shared/model/article.model';
import ImagesService from "@/entities/images/images.service";
import ArticleService from "@/entities/article/article.service";

const validations: any = {
  article: {
    name: {},
    text: {
      maxLength: maxLength(1000),
    },
    createdAt: {},
    updatedAt: {},
  },
};

@Component({
  validations,
})
export default class ArticleUpdate extends Vue {
  @Inject('articleService') private articleService: () => ArticleService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;
  @Inject('imagesService') private imagesService: () => ImagesService;

  public article: IArticle = new Article();

  public studyUsers: IStudyUsers[] = [];
  public isSaving = false;
  public currentLanguage = '';
  public uploadDocument = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.articleId) {
        vm.retrieveArticle(to.params.articleId);
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
    this.article.status = EnumArticle.NEW;
    if (this.article.id) {
      this.articleService()
        .update(this.article)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.article.updated', { param: param.id });
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
      this.articleService()
        .create(this.article)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.article.created', { param: param.id });
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

  public retrieveArticle(articleId): void {
    this.articleService()
      .find(articleId)
      .then(res => {
        this.article = res;
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

  public onChangeAttachment(event): void {
    let file = null;
    if (event && event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    }
    if (!file) {
      return;
    }
    this.imagesService()
      .uploadImage(file,1)
      .then(res => {
        (<any>this.$root).showLoader(false);
        console.log(res);
        this.article.imagesDTO = res;
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastFailed(err);
      });
  }

  // public get currentUserImage(imageId): string {
  //   return this.imagesService().getCurrUserAvatarUrl(imageId);
  // }
}
