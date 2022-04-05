import axios from 'axios';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import AccountService from '@/account/account.service';

@Component({
  watch: {
    $route() {
      this.$root.$emit('bv::hide::modal', 'login-page');
    },
  },
  components: {
  },
})
export default class LoginForm extends Vue {
  @Inject('accountService')
  private accountService: () => AccountService;
  public authenticationError = null;
  public login = null;
  public password = null;
  public viewPassword = false;
  public rememberMe = true;

  public doLogin(): void {
    (<any>this.$root).showLoader(true);
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        (<any>this.$root).showLoader(false);
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
          }
          this.authenticationError = false;
          this.$root.$emit('bv::hide::modal', 'login-page');
          this.accountService().retrieveAccount();
          this.$router.push('/');
        } else if (result.data && result.data.id_token) {
          (<any>this.$root).toastError(result.data.id_token, 'Error Login');
        } else {
          (<any>this.$root).toastError(result.data, 'Error Login');
        }
      })
      .catch(err => {
        (<any>this.$root).toastError(err.toString(), 'Error Login');
        (<any>this.$root).showLoader(false);
        this.authenticationError = true;
      });
  }
}
