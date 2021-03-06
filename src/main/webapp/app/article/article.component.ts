import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import {EnumArticle, IArticle} from '@/shared/model/article.model';

import AlertService from '@/shared/alert/alert.service';
import ArticleService from "@/entities/article/article.service";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Article extends Vue {
  @Inject('articleService') private articleService: () => ArticleService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public articles: IArticle[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllArticles();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllArticles();
  }

  public retrieveAllArticles(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    const searchForm = {
      status: EnumArticle.PUBLISHED
    }
    this.articleService()
      .retrieve(paginationQuery, searchForm)
      .then(
        res => {
          this.articles = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IArticle): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeArticle(): void {
    this.articleService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.article.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllArticles();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllArticles();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }


  public onSelectRowDbClick(row): void {
    this.$router.push({ name: 'ArticleView', params: { articleId: row.id } });
  }

  public onClickEdit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'ArticleEdit', params: { articleId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public imageUrl(id): string {
    let makeUrl = '/api/images/' + id;
    return makeUrl;
  }

  public createExamples(): void{
    this.$router.push({name: "ArticleCreate"})
  }
}
