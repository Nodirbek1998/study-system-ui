import {Component, Inject, Vue} from "vue-property-decorator";
import Vue2Filters from "vue2-filters";
import SubjectsService from "@/entities/subjects/subjects.service";
import AlertService from "@/shared/alert/alert.service";
import {ISubjects} from "@/shared/model/subjects.model";

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Subjects extends Vue {
  @Inject('subjectsService') private subjectsService: () => SubjectsService;
  @Inject('alertService') private alertService: () => AlertService;

  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public subjects: ISubjects[] = [];
  public isFetching = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.clear();
      if (to.params.groupId) {
        vm.retrieveAllSubjects(to.params.groupId);
      }
    });
  }

  public mounted(): void {
    this.retrieveAllSubjects();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllSubjects();
  }

  public retrieveAllSubjects(groupId?: number): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.subjectsService()
      .retrieve(groupId, paginationQuery)
      .then(
        res => {
          this.subjects = res.data;
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

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

}
