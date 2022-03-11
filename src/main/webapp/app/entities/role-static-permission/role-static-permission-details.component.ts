import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRoleStaticPermission } from '@/shared/model/role-static-permission.model';
import RoleStaticPermissionService from './role-static-permission.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class RoleStaticPermissionDetails extends Vue {
  @Inject('roleStaticPermissionService') private roleStaticPermissionService: () => RoleStaticPermissionService;
  @Inject('alertService') private alertService: () => AlertService;

  public roleStaticPermission: IRoleStaticPermission = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.roleStaticPermissionId) {
        vm.retrieveRoleStaticPermission(to.params.roleStaticPermissionId);
      }
    });
  }

  public retrieveRoleStaticPermission(roleStaticPermissionId) {
    this.roleStaticPermissionService()
      .find(roleStaticPermissionId)
      .then(res => {
        this.roleStaticPermission = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
