import axios from 'axios';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import TranslationService from '@/locale/translation.service';
import {IUser} from "@/shared/model/user.model";

export default class AccountService {
  public currentUser: IUser = null;
  public isFetching = false;

  constructor(private store: Store<any>, private translationService: TranslationService, private router: VueRouter) {
    this.init();
  }

  public init(): void {
    this.retrieveProfiles();
  }

  public retrieveProfiles(): Promise<boolean> {
    return new Promise(resolve => {
      axios
        .get<any>('management/info')
        .then(res => {
          if (res.data && res.data.activeProfiles) {
            this.store.commit('setRibbonOnProfiles', res.data['display-ribbon-on-profiles']);
            this.store.commit('setActiveProfiles', res.data['activeProfiles']);
          }
          resolve(true);
        })
        .catch(() => resolve(false));
    });
  }

  public retrieveAccount(): Promise<boolean> {
    console.log("api/account");
    return new Promise(resolve => {
      axios
        .get<any>('api/account')
        .then(response => {
          this.isFetching = false;
          const account = response.data;
          if (account) {
            this.retrieveAuthorities(account)
              .then(value => {
                resolve(value);
              })
              .catch(err => {
                this.isFetching = false;
                this.store.commit('logout');
                sessionStorage.removeItem('requested-url');
                document.cookie = '';
                this.router.push({ path: '/login' });
                resolve(false);
              });
          } else {
            this.store.commit('logout');
            this.router.push({path: '/login'});
            sessionStorage.removeItem('requested-url');
            document.cookie = '';
          }
          this.translationService.refreshTranslation(this.store.getters.currentLanguage);
          resolve(true);
        })
        .catch(() => {
          this.store.commit('logout');
          resolve(false);
        });
    });
  }
  public retrieveAuthorities(account): Promise<boolean> {
    this.isFetching = true;
    const authId = account.authorities && account.authorities > 0 ? account.authorities : 1;
    return new Promise(resolve => {
      axios
        .get(`/api/role-static-permissions?roleId=${authId}&size=1000&page=0`)
        .then(response => {
          this.isFetching = false;
          this.store.commit('authenticate');
          if (account) {
            account.roles = [];
            account.roles.push('User');
            if (response.data && response.data.length > 0) {
              response.data.forEach(item => {
                account.roles.push(item.staticPermission);
              });
            }
            this.currentUser = account;
            this.store.commit('authenticated', account);
            if (this.store.getters.currentLanguage !== account.langKey) {
              this.store.commit('currentLanguage', account.langKey);
            }
          } else {
            this.store.commit('logout');
            this.router.push({ path: '/login' });
            sessionStorage.removeItem('requested-url');
            document.cookie = '';
          }
          this.translationService.refreshTranslation(this.store.getters.currentLanguage);
          resolve(true);
        })
        .catch(() => {
          this.isFetching = false;
          this.store.commit('logout');
          sessionStorage.removeItem('requested-url');
          document.cookie = '';
          this.router.push({ path: '/login' });
          resolve(false);
        });
    });
  }
  public hasAnyAuthorityAndCheckAuth(authorities: any): Promise<boolean> {
    if (!this.authenticated || !this.userAuthorities) {
      const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
      if (!this.isFetching && !this.currentUser && !this.store.getters.logon && token) {
        return this.retrieveAccount();
      } else {
        return new Promise(resolve => {
          resolve(false);
        });
      }
    }
    console.log(this.userAuthorities);
    console.log(authorities);
    for (let i = 0; i < authorities.length; i++) {
      if (this.userAuthorities.includes(authorities[i])) {
        return new Promise(resolve => {
          resolve(true);
        });
      }
    }

    return new Promise(resolve => {
      resolve(false);
    });
  }
  public canAuth(...authorities): boolean {
    if (authorities.length > 0) {
      if (this.authenticated && this.userAuthorities) {
        for (let i = 0; i < authorities[0].length; i++) {
          if (this.userAuthorities.includes(authorities[0][i])) {
            return true;
          }
        }
      }
    }

    return false; // will be false
  }

  public get authenticated(): boolean {
    return this.store.getters.authenticated;
  }

  public get userAuthorities(): any {
    const auth = this.store.getters.account.roles;
    if (!auth) {
      return [];
    } else {
      return auth;
    }
  }

  private checkAuthorities(authorities: any): Promise<boolean> {
    if (this.userAuthorities) {
      for (const authority of authorities) {
        if (this.userAuthorities.includes(authority)) {
          return Promise.resolve(true);
        }
      }
    }
    return Promise.resolve(false);
  }
}
