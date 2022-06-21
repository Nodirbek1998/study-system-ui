import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import ArticleService from "@/entities/article/article.service";
import AlertService from "@/shared/alert/alert.service";
import {EnumArticle, IArticle} from "@/shared/model/article.model";
import CalendarHome from "./components/calendar/calendar-home.vue";
import ReminderHome from "./components/reminder/reminder-home.vue";

@Component({
  components:{
    CalendarHome,
    ReminderHome
  }
})
export default class Home extends Vue {
  @Inject('loginService') private loginService: () => LoginService;
  @Inject('articleService') private articleService: () => ArticleService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public isFetching = false;

  public articles: IArticle[] = [];

  created() {
    this.retrieveAllArticles();
  }

  public retrieveAllArticles(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    const searchForm = {
      status : EnumArticle.PUBLISHED
    }
    this.articleService()
      .retrieve(paginationQuery, searchForm)
      .then(
        res => {
          this.articles = res.data;
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


  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account?.login ?? '';
  }
}
