import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IArticle } from '@/shared/model/article.model';

import AlertService from '@/shared/alert/alert.service';
import ReminderService from "@/entities/reminder/reminder.service";
import {IReminder} from "@/shared/model/reminder.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ReminderComponent extends Vue {
  @Inject('reminderService') private reminderService: () => ReminderService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public reminder: IReminder[] = [];

  public isFetching = false;


  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'title',label:'title', class: 'text-truncate'},
    {key:'body',label:'body', class: 'text-truncate'},
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
    this.retrieveAllReminder();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllReminder();
  }

  public retrieveAllReminder(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.reminderService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.reminder = res.data;
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

  public prepareRemove(instance): void {
    this.removeId = instance;
    if (<any>this.$refs.removeEntityReminder) {
      (<any>this.$refs.removeEntityReminder).show();
    }
  }

  public removeReminder(): void {
    this.reminderService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.reminder.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllReminder();
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
    this.retrieveAllReminder();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntityReminder).hide();
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

  public removeArticle(): void {
    this.reminderService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.reminder.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllReminder();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }
}
