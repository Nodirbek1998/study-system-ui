import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import { IRole, Role } from '@/shared/model/role.model';
import RoleService from './role.service';

const validations: any = {
  role: {
    nameUz: {},
    nameRu: {},
    nameEn: {},
  },
};

@Component({
  validations,
})
export default class RoleUpdate extends Vue {
  @Inject('roleService') private roleService: () => RoleService;
  @Inject('alertService') private alertService: () => AlertService;

  public role: IRole = new Role();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.roleId) {
        vm.retrieveRole(to.params.roleId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.role.id) {
      this.roleService()
        .update(this.role)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.role.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.roleService()
        .create(this.role)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.role.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveRole(roleId): void {
    this.roleService()
      .find(roleId)
      .then(res => {
        this.role = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
