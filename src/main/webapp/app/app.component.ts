import Vue from 'vue';
import Component from 'vue-class-component';
import Ribbon from '@/core/ribbon/ribbon.vue';
import Loader from '@/shared/alert/loader.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import LoginForm from '@/account/login-form/login-form.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPlusCircle,
  faDownload,
  faEdit,
  faSyncAlt,
  faShareAlt,
  faHeart,
  faFileAlt,
  faUpload,
  faTrash,
  faLongArrowAltRight,
  faChartBar,
  faBook,
  faUserFriends,
  faEnvelopeOpenText,
  faTasks,
  faUsers,
  faThLarge,
  faBell,
  faBars,
  faEllipsis,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

import '@/shared/config/dayjs';
import {PropSync} from "vue-property-decorator";

library.add(
  faPlusCircle,
  faDownload,
  faEdit,
  faSyncAlt,
  faShareAlt,
  faHeart,
  faFileAlt,
  faUpload,
  faTrash,
  faLongArrowAltRight,
  faChartBar,
  faBook,
  faUserFriends,
  faEnvelopeOpenText,
  faTasks,
  faUsers,
  faThLarge,
  faBell,
  faBars,
  faEllipsis,
  faEllipsisV,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,

    'jhi-footer': JhiFooter,
    'loader': Loader,
  },
})
export default class App extends Vue {
  @PropSync('isShow', { type: Boolean, default: false }) syncedIsShow!: boolean;

  public showLoader(show?: boolean, type?: any): void {
    this.syncedIsShow = show;
  }

  created(): void {
    this.subscribeAlert();
  }

  public subscribeAlert(): void {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setAlertTitle') {
        const title = state.alertStore.alertTitle;
        const msg = state.alertStore.alertMessage;
        const type = state.alertStore.alertType;
        this.$bvToast.toast(msg, {
          title: '' + title,
          variant: type,
          solid: true,
        });
      }
    });
  }
}
