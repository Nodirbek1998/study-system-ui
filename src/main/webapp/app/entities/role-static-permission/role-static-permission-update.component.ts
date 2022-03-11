import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import RoleService from '@/entities/role/role.service';
import { IRole } from '@/shared/model/role.model';

import { IRoleStaticPermission, RoleStaticPermission } from '@/shared/model/role-static-permission.model';
import RoleStaticPermissionService from './role-static-permission.service';
import { EnumStaticPermission } from '@/shared/model/enumerations/enum-static-permission.model';

const validations: any = {
  roleStaticPermission: {
    staticPermission: {},
  },
};

@Component({
  validations,
})
export default class RoleStaticPermissionUpdate extends Vue {
  @Inject('roleStaticPermissionService') private roleStaticPermissionService: () => RoleStaticPermissionService;
  @Inject('alertService') private alertService: () => AlertService;

  public roleStaticPermission: IRoleStaticPermission = new RoleStaticPermission();

  @Inject('roleService') private roleService: () => RoleService;

  public roles: IRole[] = [];
  public enumStaticPermissionValues: string[] = Object.keys(EnumStaticPermission);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.roleStaticPermissionId) {
        vm.retrieveRoleStaticPermission(to.params.roleStaticPermissionId);
      }
      vm.initRelationships();
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
    if (this.roleStaticPermission.id) {
      this.roleStaticPermissionService()
        .update(this.roleStaticPermission)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.roleStaticPermission.updated', { param: param.id });
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
      this.roleStaticPermissionService()
        .create(this.roleStaticPermission)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.roleStaticPermission.created', { param: param.id });
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

  public retrieveRoleStaticPermission(roleStaticPermissionId): void {
    this.roleStaticPermissionService()
      .find(roleStaticPermissionId)
      .then(res => {
        this.roleStaticPermission = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.roleService()
      .retrieve()
      .then(res => {
        this.roles = res.data;
      });
  }
}
