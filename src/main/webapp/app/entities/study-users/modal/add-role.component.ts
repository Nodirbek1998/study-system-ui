import { Component, Inject, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import AlertService from '@/shared/alert/alert.service';
import TranslationService from '@/locale/translation.service';
import AccountService from '@/account/account.service';
import { mapGetters } from 'vuex';
import {IRole, Role} from "@/shared/model/role.model";
import RoleService from "@/entities/role/role.service";
import {RoleUser} from "@/shared/model/role.user.model";
import UserRoleService from "@/entities/study-users/modal/user-role.service";

@Component({
  components: {},
  computed: {
    ...mapGetters(['account']),
  },
})
export default class AddRoleComponent extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('roleService') private roleService: () => RoleService;
  @Inject('userRoleService') private userRoleService: () => UserRoleService;

  @Prop({ default: -1 }) userId!: number;
  @PropSync('selectUserName', { type: String }) username!: string;
  @PropSync('isShow', { type: Boolean }) syncedVisible!: boolean;
  public isSaving = false;
  public currentLanguage = '';
  public roles: IRole[] = [];
  public selectedRoleId = -1;
  public password = '';
  public confirmPassword = '';
  public changedUsername = '';
  public isEsp = false;

  public has_number = true;
  public has_uppercase = true;
  public has_special = true;
  public has_lowercase = true;

  public equalsNewAndConfirmPassword = true;

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.initRelationships();
  }

  mounted() {
    this.$root.$on('bv::modal::hidden', (bvEvent, modalId) => {
      if (modalId === 'user-manage-role-modal') {
        this.password = '';
        this.confirmPassword = '';

        this.$emit('hideRoleModel', false);
      }
    });
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === 'user-manage-role-modal') {
        this.getSelectedUserRole();
      }
    });
  }

  @Watch('password')
  public newPasswordValid(): void {
    this.has_number = !/\d/.test(this.password);
    this.has_lowercase = !/[a-z]/.test(this.password);
    this.has_uppercase = !/[A-Z]/.test(this.password);
    this.has_special = !/[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
    if (this.password !== this.confirmPassword) this.equalsNewAndConfirmPassword = true;
  }

  @Watch('confirmPassword')
  public confirmPasswordValid(): void {
    if (this.password === this.confirmPassword) this.equalsNewAndConfirmPassword = false;
  }

  public onSubmitSelectRole(): void {
    if (this.password && (this.confirmPassword === null || this.confirmPassword === '')) {
      (<any>this.$root).toastError(this.$t('global.messages.validate.confirmpassword.required').toString());
      return;
    }
    if (this.password && this.confirmPassword !== this.password) {
      (<any>this.$root).toastError(this.$t('global.messages.error.dontmatch').toString());
      return;
    }
    const role = new RoleUser();
    role.roleId = this.selectedRoleId;
    role.userId = this.userId;
    role.login = this.changedUsername ? this.changedUsername : this.username;
    role.password = this.password;
    (<any>this.$root).showLoader(true);
    this.userRoleService()
      .create(role)
      .then(res => {
        (<any>this.$root).showLoader(false);
        const message = this.$t('kdbemdocsuiApp.edoUserRole.created', { param: res.id });
        (<any>this.$root).toastSuccess(message);
        this.$emit('retrieveAllItems', 'update username');
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        if (err.response && err.response.data && err.response.data.title) {
          (<any>this.$root).toastError(err.response.data.title);
        } else {
          (<any>this.$root).toastError(err.toString());
        }
      });
  }

  // public sendEmailLoginPassword(): void {
  //   console.log(123);
  //   const data = { username: this.username, password: this.password };
  //   (<any>this.$root).showLoader(true);
  //   this.accountService()
  //     .sendEmailLoginPassword(data, this.userId)
  //     .then(res => {
  //       (<any>this.$root).showLoader(false);
  //       const message = this.$t('global.messages.info.authenticated.send', { param: res.message });
  //       (<any>this.$root).toastSuccess(message);
  //       this.$emit('retrieveAllItems', 'update username');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       console.log(err.response.status);
  //       console.log(err.response.data);
  //     });
  // }

  public initRelationships(): void {
    const paginationQuery = {
      page: 0,
      size: 1000,
      sort: ['id,asc'],
    };
    this.roleService()
      .retrieve(paginationQuery)
      .then(res => {
        this.roles = res.data;
      });
  }

  public getSelectedUserRole(): void {
    (<any>this.$root).showLoader(true);
    const paginationQuery = {
      page: 0,
      size: 1,
      sort: ['id,asc'],
    };
    const f = { userId: this.userId };
    this.userRoleService()
      .retrieve(paginationQuery, f)
      .then(res => {
        (<any>this.$root).showLoader(false);
        if (res.data.length > 0) {
          this.selectedRoleId = res.data[0].roleId;
          this.isEsp = res.data[0].isEsp;
        }
      })
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastError(err.toString());
      });
  }

  public changeUserName(event): void {
    this.changedUsername = event;
  }
}
