import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRole } from '@/shared/model/role.model';

import RoleService from './role.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Role extends Vue {
  @Inject('roleService') private roleService: () => RoleService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public roles: IRole[] = [];

  public isFetching = false;

  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'nameUz',label:'nameUz', class: 'text-truncate'},
    {key:'nameRu',label:'nameRu', class: 'text-truncate'},
    {key:'nameEu',label:'nameEn', class: 'text-truncate'},
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
    this.retrieveAllRoles();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllRoles();
  }

  public retrieveAllRoles(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.roleService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.roles = res.data;
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

  public prepareRemove(instance: IRole): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }


  public onClickEdit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'RoleEdit', params: { roleId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public onAddGroupPermit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'RoleStaticPermissionEdit', params: { roleStaticPermissionId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }
  public removeRole(): void {
    this.roleService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.role.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllRoles();
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
    this.retrieveAllRoles();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
