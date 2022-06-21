import {Component, Inject, Vue} from "vue-property-decorator";
import User from "@/groups/user/user-groups.vue";
import GroupsService from "@/entities/groups/groups.service";
import AlertService from "@/shared/alert/alert.service";
import {Groups, IGroups} from "@/shared/model/groups.model";
import {IUser} from "@/shared/model/user.model";
import UnitsService from "@/entities/units/units.service";
import {IUnits} from "@/shared/model/units.model";

@Component({
  components: {

  }
})
export default class GroupsComponent extends Vue {
  @Inject('groupsService') private groupsService: () => GroupsService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('unitsService') private unitsService: () => UnitsService;

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
  public units: IUnits[] = [];


  public isFetching = false;

  public userFields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'firstName', label:'firstName', class: 'text-truncate'},
    {key:'lastName', label:'lastName', class: 'text-truncate'},
    {key:'phone', label:'phone', class: 'text-truncate'},
    { key: 'action', label: 'Action', class: 'text-right' },
  ];
  public unitsFields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'nameUz', label:'nameUz', class: 'text-truncate'},
    {key:'nameRu', label:'nameRu', class: 'text-truncate'},
    {key:'nameEn', label:'nameEn', class: 'text-truncate'},
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
      vm.retrieveUnitGroups();
    });
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

  public retrieveUnitGroups(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    const searchForm = {
      subjectId: this.$route.query.subjectId,
      groupId: this.$route.params.groupId,
    }
    this.unitsService()
      .retrieve(paginationQuery,searchForm)
      .then(
        res => {
          this.units = res.data.content;
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

  public onSelectRowDbClickUnits(row): void {
     this.$router.push({ name: 'UserTasks', params: { unitsId: row.id } });
  }
  public onSelectRowDbClickUsers(row): void {
    this.$router.push({ name: 'UserTasks', params: { unitsId: row.id } });
  }
  public handleSyncList(): void {
    this.clear();
  }



}
