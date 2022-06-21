import Vue from "vue";
import {Component, Inject} from "vue-property-decorator";
import Vue2Filters from "vue2-filters";
import GroupsService from "@/entities/groups/groups.service";
import AlertService from "@/shared/alert/alert.service";
import {Groups, IGroups} from "@/shared/model/groups.model";
import {IUser} from "@/shared/model/user.model";


@Component({
  mixins: [Vue2Filters.mixin],
})
export default class UserGroups extends Vue {
  @Inject('groupsService') private groupsService: () => GroupsService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public group: IGroups = new Groups();
  public users: IUser[] = [];

  public isFetching = false;

  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'firstName', label:'firstName', class: 'text-truncate'},
    {key:'lastName', label:'lastName', class: 'text-truncate'},
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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(to.params.groupId);
      if (to.params.groupId) {
        vm.retrieveUserGroups(to.params.groupId);
      }
    });
  }
  public mounted(): void {

  }

  public clear(): void {
    this.page = 1;
    this.transition();
  }

  public retrieveUserGroups(id): void {
    this.isFetching = true;
    this.groupsService()
      .find(id)
      .then(
        res => {
          this.group = res;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }


  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public openGroup(id): void {
    console.log(id)
    if (id && id > 0) {
      this.$router.push({ name: 'OpenGroup', params: { groupId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveUserGroups(this.$route.params.groupId);
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
  public handleSyncList(): void {
    this.clear();
  }

}
