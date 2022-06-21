import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IGroups } from '@/shared/model/groups.model';

import AlertService from '@/shared/alert/alert.service';
import GroupsService from "@/entities/groups/groups.service";
import SubjectsService from "@/entities/subjects/subjects.service";
import {mapGetters} from "vuex";

@Component({
  computed: {
    ...mapGetters({
      groups: 'groups'
    }),
  },
})
export default class GroupsComponent extends Vue {
  @Inject('groupsService') private groupsService: () => GroupsService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('subjectsService') private subjectsService: () => SubjectsService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;


  public isFetching = false;

  public fields = [
    {key:'id', label:'Id', class: 'text-truncate'},
    {key:'name',label:'name', class: 'text-truncate'},
    // {key:'createdAt',label:'createdAt', class: 'text-truncate'},
    // {key:'updatedAt',label:'updatedAt', class: 'text-truncate'},
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

  beforeRouteUpdate(to, from, next) {
    this.retrieveAllGroups(to.query);
    next();
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllGroups(to.query);
    });
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllGroups(0);
  }

  public retrieveAllGroups(query?: any): void {

    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.$store.dispatch('fetchGroups', query).then();

  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IGroups): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeGroups(): void {
    this.groupsService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('studysystemApp.groups.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllGroups(this.$route.params.subjectId ? this.$route.params.subjectId : 0);
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
    this.retrieveAllGroups(this.$route.params.subjectId ? this.$route.params.subjectId : 0);
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
      this.$router.push({ name: 'GroupsEdit', params: { groupsId: id } });
    } else {
      (<any>this.$root).toastWarning(this.$t('global.messages.warning.rowNotSelect'));
    }
  }

  public onSelectRowDbClick(row): void {
    this.$router.push({ name: 'OpenGroup', params: { groupId: row.id }, query: {subjectId: this.$route.query.subjectId} });
  }
}
