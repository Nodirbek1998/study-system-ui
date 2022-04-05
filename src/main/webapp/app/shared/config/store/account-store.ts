import { Module } from 'vuex';

export interface AccountStateStorable {
  logon: boolean;
  userIdentity: null | any;
  authenticated: boolean;
  ribbonOnProfiles: string;
  activeProfiles: string;
  menuCollapse: string,
}

export const defaultAccountState: AccountStateStorable = {
  logon: false,
  userIdentity: null,
  authenticated: false,
  ribbonOnProfiles: '',
  activeProfiles: '',
  menuCollapse: '',
};

export const accountStore: Module<AccountStateStorable, any> = {
  state: { ...defaultAccountState },
  getters: {
    logon: state => state.logon,
    account: state => state.userIdentity,
    authenticated: state => state.authenticated,
    activeProfiles: state => state.activeProfiles,
    ribbonOnProfiles: state => state.ribbonOnProfiles,
    menuCollapse: state => state.menuCollapse,
  },
  mutations: {
    authenticate(state) {
      state.logon = true;
    },
    authenticated(state, identity) {
      state.userIdentity = identity;
      state.authenticated = true;
      state.logon = false;
    },
    logout(state) {
      state.userIdentity = null;
      state.authenticated = false;
      state.logon = false;
    },
    setActiveProfiles(state, profile) {
      state.activeProfiles = profile;
    },
    setRibbonOnProfiles(state, ribbon) {
      state.ribbonOnProfiles = ribbon;
    },
    setMenuCollapse(state) {
      if (!state.menuCollapse) {
        state.menuCollapse = 'active';
      } else {
        state.menuCollapse = '';
      }
    },
  },
};
