import { Component, Vue, Inject } from 'vue-property-decorator';

import { maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import { IArticle, Article } from '@/shared/model/article.model';
import ArticleService from './article.service';

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

  public article: IArticle = new Article();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];
  public isSaving = false;
  public currentLanguage = '';

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
    if (this.article.id) {
      this.articleService()
        .update(this.article)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Article is updated with identifier ' + param.id;
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
          const message = 'A Article is created with identifier ' + param.id;
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
}
