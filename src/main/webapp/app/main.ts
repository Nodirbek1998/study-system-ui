// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setupAxiosInterceptors } from '@/shared/config/axios-interceptor';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

import App from './app.vue';
import Vue2Filters from 'vue2-filters';
import ModalPlugin, { BootstrapVueIcons } from 'bootstrap-vue';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';
import InfiniteLoading from 'vue-infinite-loading';
import HealthService from './admin/health/health.service';
import MetricsService from './admin/metrics/metrics.service';
import LogsService from './admin/logs/logs.service';
import ConfigurationService from '@/admin/configuration/configuration.service';
import ActivateService from './account/activate/activate.service';
import RegisterService from './account/register/register.service';
import UserManagementService from './admin/user-management/user-management.service';
import LoginService from './account/login.service';
import AccountService from './account/account.service';
import GroupsService from './entities/groups/groups.service';
import AlertService from './shared/alert/alert.service';

import '../content/scss/global.scss';
import '../content/scss/vendor.scss';
import TranslationService from '@/locale/translation.service';
import ArticleService from "@/entities/article/article.service";
import UserRoleService from "@/entities/study-users/modal/user-role.service";
import FilesService from "@/entities/files/files.service";
import ImagesService from "@/entities/images/images.service";
import JhiDataUtils from "@/shared/data/data-utils.service";
import ReminderService from "@/entities/reminder/reminder.service";
import CalendarService from "@/entities/calendar/calendar.service";
import SubjectsService from "@/entities/subjects/subjects.service";
import UnitsService from "@/entities/units/units.service";
import TaskService from "@/entities/task/task.service";
import vSelect from 'vue-select';
import ExamplesService from "@/examples/examples.service";
import ExamplesAnswerService from "@/examples-answer/examples-answer.service";
import StudyUsersService from "@/entities/study-users/study-users.service";
/* tslint:disable */

// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

/* tslint:enable */
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.use(ModalPlugin);
Vue.use(DatePicker);
Vue.use(BootstrapVueIcons);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);
Vue.component('v-select', vSelect);

const dataUtils = new JhiDataUtils();

Vue.prototype.$can = (...args) => accountService.canAuth(args);
Vue.prototype.$imageUrl = (fileId: number) => dataUtils.getImageFileUrl(fileId);
Vue.prototype.$fileUrl = (fileId: number) => dataUtils.getFileUrl(fileId);
Vue.prototype.$currentHost = () => dataUtils.getCurrentHost();
const i18n = config.initI18N(Vue);
const store = config.initVueXStore(Vue);

const translationService = new TranslationService(store, i18n);
const loginService = new LoginService();
const accountService = new AccountService(store, translationService, router);

router.beforeEach(async (to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  } else if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
const vue = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  methods: {
    showLoader(show?: boolean, type?: any) {
      this.isShowLoader = show;
    },
    toastSuccess(text): void {
      const title = this.$t('toast.successTitle');
      this.$bvToast.toast(text, {
        title: '' + title,
        variant: 'success',
        solid: true,
      });
    },
    toastWarning(text): void {
      const title = this.$t('toast.warningTitle');
      this.$bvToast.toast(text, {
        title: '' + title,
        variant: 'warning',
        solid: true,
      });
    },
    toastError(text, titleStr?: string): void {
      const title = titleStr || this.$t('toast.errorTitle');
      this.$bvToast.toast(text, {
        title: '' + title,
        variant: 'danger',
        solid: true,
      });
    },

    toastFailed(err?: any): void {
      // Create a ID with a incremented count
      const elList = [];
      if (err && err.response && err.response.data) {
        const dataResponse = err.response.data;
        const hch = this.$createElement;
        elList.push(hch('p', {}, dataResponse.title));
        if (dataResponse.fieldErrors && dataResponse.fieldErrors.length > 0) {
          dataResponse.fieldErrors.forEach(fe => {
            const hch2 = this.$createElement;
            elList.push(hch2('p', {}, fe.field + ' - ' + fe.message));
          });
        } else if (dataResponse.detail) {
          const h = this.$createElement;

          elList.push(h('p', {}, dataResponse.detail));
        } else if (err.message) {
          const h = this.$createElement;

          elList.push(h('p', {}, err.message.toString()));
        }
      } else if (err && err.message) {
        const h = this.$createElement;

        elList.push(h('p', {}, err.message.toString()));
      } else {
        const h = this.$createElement;

        elList.push(h('p', {}, err.toString()));
      }

      const title = this.$t('toast.errorTitle');
      this.$bvToast.toast(elList, {
        title: '' + title,
        variant: 'danger',
        solid: true,
      });
    },
    toastInfo(text): void {
      const title = this.$t('toast.infoTitle');
      this.$bvToast.toast(text, {
        title: '' + title,
        variant: 'info',
        solid: true,
      });
    },
    toastNotification(content, id, url, notification): void {
      const title = content;
      this.$bvToast.toast(notification.message, {
        title: title,
        id: id.toString(),
        variant: 'info',
        solid: true,
        href: url,
      });
    },

    hasPermission(roles): boolean {
      if (Array.isArray(roles)) {
      } else if (typeof roles === 'string') {
      }

      return true;
    },
  },
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userManagementService: () => new UserManagementService(),
    healthService: () => new HealthService(),
    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),
    articleService: () => new ArticleService(),
    translationService: () => translationService,
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
    alertService: () => new AlertService(),
    studyUsersService: () => new StudyUsersService(),
    calendarService: () => new CalendarService(),
    groupsService: () => new GroupsService(),
    reminderService: () => new ReminderService(),
    userRoleService: () => new UserRoleService(),
    fileService: () => new FilesService(),
    subjectsService: () => new SubjectsService(),
    filesService: () => new FilesService(),
    taskService: () => new TaskService(),
    imagesService: () => new ImagesService(),
    unitsService: () => new UnitsService(),
    examplesService: () => new ExamplesService(),
    examplesAnswerService: () => new ExamplesAnswerService(),
  },
  i18n,
  store,
});

setupAxiosInterceptors(
  error => {
    const url = error.response?.config?.url;
    const status = error.status || error.response.status;
    if (status === 401) {
      // Store logged out state.
      store.commit('logout');
      if (!url.endsWith('api/account') && !url.endsWith('api/authenticate')) {
        // Ask for a new authentication
        loginService.openLogin(vue);
        return;
      }
    }
    console.log('Unauthorized!');
    return Promise.reject(error);
  },
  error => {
    console.log('Server error!');
    return Promise.reject(error);
  }
);
