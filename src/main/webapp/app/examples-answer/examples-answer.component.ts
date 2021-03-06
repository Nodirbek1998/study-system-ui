import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IArticle } from '@/shared/model/article.model';

import ExamplesAnswerService from './examples-answer.service';
import AlertService from '@/shared/alert/alert.service';
import {IExamples} from "@/shared/model/examples.model";
import {IExamplesAnswer} from "@/shared/model/examples-answer.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Article extends Vue {
  @Inject('examplesAnswerService') private examplesAnswerService: () => ExamplesAnswerService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public examplesAnswer: IExamplesAnswer[] = [];

  public isFetching = false;


  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'name',label:'name', class: 'text-truncate'},
    {key:'text',label:'text', class: 'text-truncate'},
    { key: 'action', label: 'Action', class: 'text-right' },
  ]

  public tableOptions = {
    striped: true,
    bordered: false,
    borderless: false,
    outlined: false,
    small: false,
    hover: false,
    dark: false,
    fixed: false,
    footClone: false,
    headVariant: null,
    tableVariant: '',
    noCollapse: false,
    responsive: true,
    selectable: true,
    selectMode: 'single',
    stickyHeader: true,
  };

  public mounted(): void {
    this.retrieveAllExamplesAnswer();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllExamplesAnswer();
  }

  public retrieveAllExamplesAnswer(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.examplesAnswerService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.examplesAnswer = res.data;
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
    this.examplesAnswerService()
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
        this.retrieveAllExamplesAnswer();
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
    this.retrieveAllExamplesAnswer();
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
    this.$router.push({ name: 'ExamplesAnswerView', params: { examplesAnswerId: row.id } });
  }

  public onClickEdit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'ExamplesAnswerEdit', params: { examplesAnswerId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }
  public createExamples(): void{
    this.$router.push({name: "ExamplesAnswerCreate"})
  }

}
