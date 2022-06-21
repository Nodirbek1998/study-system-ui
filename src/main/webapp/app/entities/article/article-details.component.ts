import { Component, Vue, Inject } from 'vue-property-decorator';

import {EnumArticle, IArticle} from '@/shared/model/article.model';
import ArticleService from './article.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ArticleDetails extends Vue {
  @Inject('articleService') private articleService: () => ArticleService;
  @Inject('alertService') private alertService: () => AlertService;

  public article: IArticle = {};
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.articleId) {
        vm.retrieveArticle(to.params.articleId);
      }
    });
  }

  public retrieveArticle(articleId) {
    this.articleService()
      .find(articleId)
      .then(res => {
        this.article = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }

  public get imageUrl(): string {
    let makeUrl = '/api/images/' + 0;

    if (this.article && this.article.imagesDTO) {
      if (this.article.imagesDTO.id) {
        makeUrl = '/api/images/' + this.article.imagesDTO.id;
      }
    }
    return makeUrl;
  }

  public save(): void {
    this.isSaving = true;
    this.article.status = EnumArticle.PUBLISHED;
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
    }
  }
}
