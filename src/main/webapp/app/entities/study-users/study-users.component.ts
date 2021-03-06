import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IStudyUsers } from '@/shared/model/study-users.model';

import StudyUsersService from './study-users.service';
import AlertService from '@/shared/alert/alert.service';
import AddRoleComponent from '@/entities/study-users/modal/add-role.vue';

@Component({
  mixins: [Vue2Filters.mixin],
  components: {
    AddRoleComponent
  }
})
export default class StudyUsers extends Vue {
  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public isShowRoleModal = false;
  public selectedUserId = -1;
  public selectedUserName = '';

  public studyUsers: IStudyUsers[] = [];

  public isFetching = false;

  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'firstName', label:'firstName', class: 'text-truncate'},
    {key:'lastName', label:'lastName', class: 'text-truncate'},
    {key:'age', label:'age', class: 'text-truncate'},
    {key:'email', label:'email', class: 'text-truncate'},
    {key:'phone', label:'phone', class: 'text-truncate'},
    { key: 'action', label: 'Action', class: 'text-right' },
  ];

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
    this.retrieveAllStudyUserss();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllStudyUserss();
  }

  public retrieveAllStudyUserss(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.studyUsersService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.studyUsers = res.data;
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

  public prepareRemove(instance: IStudyUsers): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeStudyUsers(): void {
    this.studyUsersService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.studyUsers.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllStudyUserss();
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
    this.retrieveAllStudyUserss();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public onClickEdit(id): void {
    if (id && id > 0) {
      this.$router.push({ name: 'StudyUserEdit', params: { studyUsersId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public onSelectRowDbClick(row): void {
    this.$router.push({ name: 'StudyUserView', params: { usersId: row.id } });
  }


  public onDependRole(selectedRow): void {
    if (selectedRow) {
      this.selectedUserId = selectedRow.id;
      this.selectedUserName = selectedRow.login;
      this.isShowRoleModal = !this.isShowRoleModal;
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public hideUserModal(isShow): void {
    this.isShowRoleModal = isShow;
  }

}
