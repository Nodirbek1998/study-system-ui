import Vue from "vue";
import JhiDataUtils from "@/shared/data/data-utils.service";
import Component from "vue-class-component";
import Ribbon from "@/core/ribbon/ribbon.vue";
import JhiNavbar from "@/core/jhi-navbar/jhi-navbar.vue";
import JhiFooter from "@/core/jhi-footer/jhi-footer.vue";
import LoginForm from "@/account/login-form/login-form.vue";
import JhiSideBar from "@/core/jhi-sidebar/jhi-sidebar.vue";


@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,

    'jhi-footer': JhiFooter,
    'jhi-sidebar': JhiSideBar,
  },
})
export default class MainLayout extends Vue {

  public dataUtilsService: JhiDataUtils;

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }
  created(): void {
    const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    if (!token) {
      this.$router.push({ name: 'Login' });
    }
    this.dataUtilsService = new JhiDataUtils();
    this.notifyPermission();
  }

  public notifyPermission(): void {
    if (Notification.permission === 'default' || Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          // const notification = new Notification('Permission success');
        }
      });
    }
  }

}
