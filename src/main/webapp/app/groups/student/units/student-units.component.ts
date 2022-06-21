import {Component, Inject, Vue, Watch} from "vue-property-decorator";
import GroupsService from "@/entities/groups/groups.service";
import AlertService from "@/shared/alert/alert.service";
import UnitsService from "@/entities/units/units.service";
import {Groups, IGroups} from "@/shared/model/groups.model";
import {IUser} from "@/shared/model/user.model";
import {IUnits} from "@/shared/model/units.model";
import TranslationService from "@/locale/translation.service";
import {mapGetters} from "vuex";


@Component({
  computed: {
    ...mapGetters({
      subjects: 'subjects'
    }),
  },
  components: {

  }
})
export default class GroupsComponent extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('unitsService') private unitsService: () => UnitsService;
  @Inject('translationService') private translationService: () => TranslationService;



  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public units: IUnits[] = [];


  public isFetching = false;
  public subjectId  = null;

  public fields = [
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
      vm.retrieveUnitGroups();
    });
  }

  created(): void {
    this.$store.dispatch('fetchSubjects', { translationService: this.translationService() });
  }

  public retrieveUnitGroups(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    const searchForm = {
      subjectId: -1,
    }
    console.log(this.subjectId);
    if (this.subjectId === 0 ){
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
    }else{
      searchForm.subjectId = this.subjectId;
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
  }
  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public onChangeSubjects(): void{
    this.retrieveUnitGroups();
  }

  public handleSyncList(): void {
    this.clear();
  }

  public clear(): void {
    this.page = 1;
    this.transition();
  }
  public transition(): void {
    this.retrieveUnitGroups();
  }
  @Watch('subjectId')
  public changeSubject(): void{
    this.retrieveUnitGroups();
  }

}
