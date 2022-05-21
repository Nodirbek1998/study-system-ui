import Vue from "vue";
import {Component, Inject} from "vue-property-decorator";
import Vue2Filters from "vue2-filters";
import GroupsService from "@/entities/groups/groups.service";
import AlertService from "@/shared/alert/alert.service";
import {IGroups} from "@/shared/model/groups.model";


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

  public groups: IGroups[] = [];

  public isFetching = false;


  public mounted(): void {
    this.retrieveUserGroups();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveUserGroups();
  }

  public retrieveUserGroups(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.groupsService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.groups = res.data;
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
}
