import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';
import {mapGetters} from "vuex";
import {IRouteStatistic, RouteStatistic} from "@/shared/model/statistic.route";
import ImagesService from "@/entities/images/images.service";
import AlertService from "@/shared/alert/alert.service";

@Component({
  computed: {
    ...mapGetters({
        subjects: 'subjects'
    }),
  },
})
export default class JhiSideBar extends Vue {
  @Inject('loginService') private loginService: () => LoginService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('imagesService') private imagesService: () => ImagesService;

  @Inject('accountService') private accountService: () => AccountService;
  @Inject('alertService') private alertService: () => AlertService;
  public version = VERSION ? 'v' + VERSION : '';
  private currentLanguage = this.$store.getters.currentLanguage;
  private languages: any = this.$store.getters.languages;
  private hasAnyAuthorityValue = false;
  private isStatistics: IRouteStatistic = new RouteStatistic();

  public isCollapseInternalMenu1 = false;
  public isCollapseInternalMenu2 = false;

  public isFetching = false;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  created() {
    this.translationService().refreshTranslation(this.currentLanguage);
    this.$store.dispatch('fetchSubjects', { translationService: this.translationService() });
  }


  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal, oldValue) {
    // if (oldValue && oldValue.name === 'CreateDocumentComponent') {
    //   this.getInternalCountSideBar();
    // }
    this.isStatistics.main = newVal && newVal.path.includes('/home');
    this.isStatistics.subject = newVal && newVal.path.includes('/subject');
    this.isStatistics.admin = newVal && newVal.path.includes('/admin');
    this.isStatistics.group = newVal && newVal.path.includes('/user/groups');
    this.isStatistics.studentGroup = newVal && newVal.path.includes('/student/groups');
    this.isStatistics.article = newVal && newVal.path.includes('/articles');
    this.isStatistics.examples = newVal && newVal.path.includes('/examples');

  }


  public get currentUserDisplayName(): string {
    return this.$store.getters.account ? this.$store.getters.account.displayName : '';
  }


  public subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input];
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0; // current path starts with this path string
    });
  }



  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public get currentUser(): number {
    return this.$store.getters.account ? this.$store.getters.account.id : 0;
  }


  public changeLanguage(newLanguage: string): void {
    this.translationService().refreshTranslation(newLanguage);
  }

  public isActiveLanguage(key: string): boolean {
    return key === this.$store.getters.currentLanguage;
  }

  public logout(): void {
    localStorage.removeItem('jwt-token');
    sessionStorage.removeItem('jwt-token');
    this.$store.commit('logout');
    this.$router.push('/login');
  }

  public get currentUserImage(): string {
    const imageId = this.$store.getters.account ? this.$store.getters.account.id : 0;
    return this.imagesService().getCurrUserAvatarUrl(imageId);
  }

  public get currentUserName(): string {
    let name = '';
    if (this.$store.getters.account) {
      const username = this.$store.getters.account.firstName;
      if (username) {
        name = username;
      }
    }
    return name;
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValue = value;
      });
    return this.hasAnyAuthorityValue;
  }

  public get swaggerEnabled(): boolean {
    return this.$store.getters.activeProfiles.indexOf('swagger') > -1;
  }

  public get inProduction(): boolean {
    return this.$store.getters.activeProfiles.indexOf('prod') > -1;
  }

  public get openAPIEnabled(): boolean {
    return this.$store.getters.activeProfiles.indexOf('api-docs') > -1;
  }
}
