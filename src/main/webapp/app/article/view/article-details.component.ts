import { Component, Vue, Inject } from 'vue-property-decorator';

import { IArticle } from '@/shared/model/article.model';
import AlertService from '@/shared/alert/alert.service';
import ArticleService from "@/entities/article/article.service";

@Component
export default class ArticleDetails extends Vue {
  @Inject('articleService') private articleService: () => ArticleService;
  @Inject('alertService') private alertService: () => AlertService;

  public article: IArticle = {};

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

}
