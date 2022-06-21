import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITask } from '@/shared/model/task.model';

import AlertService from '@/shared/alert/alert.service';
import TaskService from "@/entities/task/task.service";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TasksComponent extends Vue {
  @Inject('taskService') private taskService: () => TaskService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public tasks: ITask[] = [];

  public isFetching = false;
  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'topic',label:'topic', class: 'text-truncate'},
    {key:'deadline',label:'deadline', class: 'text-truncate'},
    {key:'files',label:'files', class: 'text-truncate'},
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



  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(to.params.unitsId);
      if (to.params.unitsId) {
        vm.retrieveAllTasks(to.params.unitsId);
      }
    });
  }
  // public mounted(): void {
  //   this.retrieveAllTasks();
  // }
  //
  // public clear(): void {
  //   this.page = 1;
  //   this.retrieveAllTasks();
  // }

  public retrieveAllTasks(id): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    const searchForm = {
      unitsId: this.$route.params.unitsId
    }
    this.taskService()
      .retrieve(paginationQuery, searchForm)
      .then(
        res => {
          this.tasks = res.data;
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
    // this.clear();
  }

  public prepareRemove(instance: ITask): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTask(): void {
    this.taskService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.task.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        // this.retrieveAllTasks();
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
    // this.retrieveAllTasks();
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
    this.$router.push({ name: 'ViewTask', params: {unitsId: this.$route.params.unitsId,  taskId: row.id } });
  }

  public onClickEdit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'TaskEdit', params: { taskId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }


}
