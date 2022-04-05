import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRoleStaticPermission } from '@/shared/model/role-static-permission.model';

import RoleStaticPermissionService from './role-static-permission.service';
import AlertService from '@/shared/alert/alert.service';
import DualListBox from 'dual-listbox-vue';
import 'dual-listbox-vue/dist/dual-listbox.css';

@Component({
  mixins: [Vue2Filters.mixin],
  components: {
    DualListBox,
  },
})
export default class RoleStaticPermission extends Vue {
  @Inject('roleStaticPermissionService') private roleStaticPermissionService: () => RoleStaticPermissionService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public allSource = [];
  public source = [];
  public destination = [];
  public userRoles = [];
  public currentRoleId = 0;

  public roleStaticPermissions: IRoleStaticPermission[] = [];

  public isFetching = false;

  public mounted(): void {
    this.getAllPermissions();
    this.getUserRoles();
  }

  public onChangeList({ source, destination }) {
    let addPermissions = [];
    let deletedPermissions = [];
    if (this.destination == null || this.destination.length === 0) {
      addPermissions = destination;
    } else {
      deletedPermissions = this.destination.filter(x => destination.filter(second => second.code === x.code).length === 0);
      addPermissions = destination.filter(x => this.destination.filter(second => second.code === x.code).length === 0);
    }

    this.source = source;
    this.destination = destination;

    this.addRolePermissions(addPermissions);
    this.deleteRolePermissions(deletedPermissions);
  }

  public getAllPermissions(): void {
    this.isFetching = true;
    (<any>this.$root).showLoader(true);
    this.roleStaticPermissionService()
      .getAllPermissions()
      .then(
        res => {
          (<any>this.$root).showLoader(false);
          const newSource = [];
          res.data.forEach(item => {
            newSource.push({ name: item, code: item });
          });

          this.allSource = newSource;
          this.source = newSource;
        },
        err => {
          (<any>this.$root).showLoader(false);
          (<any>this.$root).toastFailed(err);
          this.isFetching = false;
        }
      );
  }

  public getUserRoles(): void {
    (<any>this.$root).showLoader(true);
    this.isFetching = true;
    this.roleStaticPermissionService()
      .getUserRoles()
      .then(
        res => {
          this.userRoles = res.data;
        },
        err => {
          (<any>this.$root).showLoader(false);
          (<any>this.$root).toastFailed(err);
          this.isFetching = false;
        }
      );
  }

  public onChangeRole(roleId): void {
    this.getRolePermissionsById(roleId);
  }

  public getRolePermissionsById(roleId): void {
    this.isFetching = true;
    (<any>this.$root).showLoader(true);
    this.roleStaticPermissionService()
      .getRolePermissionsById(roleId)
      .then(
        res => {
          (<any>this.$root).showLoader(false);
          const newDestination = [];
          res.data.forEach(item => {
            newDestination.push({ name: item.staticPermission, code: item.staticPermission });
          });

          this.destination = newDestination;
          this.currentRoleId = roleId;
          this.filterRolePermissions();
          this.isFetching = false;
        },
        err => {
          (<any>this.$root).showLoader(false);
          this.isFetching = false;
        }
      )
      .catch(err => {
        (<any>this.$root).showLoader(false);
        (<any>this.$root).toastError(err.toString());
      });
  }

  public addRolePermissions(rolePermissions): void {
    if (rolePermissions === null) {
      return;
    }
    rolePermissions.forEach(rolePermission => {
      this.isFetching = true;
      (<any>this.$root).showLoader(true);
      this.roleStaticPermissionService()
        .addRolePermissions({ staticPermission: rolePermission.code, roleId: this.currentRoleId })
        .then(
          res => {
            (<any>this.$root).showLoader(false);
            this.isFetching = false;
          },
          err => {
            (<any>this.$root).showLoader(false);
            this.isFetching = false;
          }
        );
    });
  }

  public deleteRolePermissions(rolePermissions): void {
    if (rolePermissions === null) {
      return;
    }

    rolePermissions.forEach(rolePermission => {
      this.isFetching = true;
      this.roleStaticPermissionService()
        .deleteRolePermissions({ staticPermission: rolePermission.code, roleId: this.currentRoleId })
        .then(
          res => {
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
    });
  }

  public filterRolePermissions(): void {
    if (this.destination.length > 0) {
      const difference = this.allSource.filter(x => this.destination.filter(second => second.code === x.code).length === 0);
      this.source = difference;
    } else {
      this.source = this.allSource;
    }
  }
}
