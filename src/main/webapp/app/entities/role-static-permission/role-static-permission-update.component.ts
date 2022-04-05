import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import RoleService from '@/entities/role/role.service';
import { IRole } from '@/shared/model/role.model';

import { IRoleStaticPermission, RoleStaticPermission } from '@/shared/model/role-static-permission.model';
import RoleStaticPermissionService from './role-static-permission.service';
import { EnumStaticPermission } from '@/shared/model/enumerations/enum-static-permission.model';
import {ISelectModel} from "@/shared/model/select/select-model";
import DualListBox from 'dual-listbox-vue';
import 'dual-listbox-vue/dist/dual-listbox.css';

const validations: any = {
  roleStaticPermission: {
    staticPermission: {},
  },
};

@Component({
  validations,
  components: {
    DualListBox,
  },
})
export default class RoleStaticPermissionUpdate extends Vue {
  @Inject('roleStaticPermissionService') private roleStaticPermissionService: () => RoleStaticPermissionService;
  @Inject('alertService') private alertService: () => AlertService;

  public roleStaticPermission: IRoleStaticPermission = new RoleStaticPermission();

  @Inject('roleService') private roleService: () => RoleService;

  public roles: IRole = null;
  public isSaving = false;
  public edoJurnals: string[] = [];
  public currentLanguage = '';
  public itemsPerPage = 1000;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public allSource = [];
  public source = [];
  public allDestination = [];
  public destination = [];
  public userRoles = [];
  public currentRoleId = 0;
  public isFetching = false;
  public isChanging = false;

  public addRolePermits = [];
  public deleteRolePermits = [];

  public sourceByCategory = {
    navbar: [],
    subject: [],
    group: [],
    units: [],
    test: [],
    task: [],
    article: [],
  };

  public destinationByCategory = {
    navbar: [],
    subject: [],
    group: [],
    units: [],
    test: [],
    task: [],
    article: [],
  };

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.roleStaticPermissionId) {
        vm.initRelationships(to.params.roleStaticPermissionId);
        vm.currentRoleId = to.params.roleStaticPermissionId;
      }
    });
  }

  mounted() {
      if (this.$route.params.roleStaticPermissionId) {
        this.getRolePermissionsById(this.$route.params.roleStaticPermissionId);
        this.getAllPermissions();
      }
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
          const message = this.$t('kdbemdocsuiApp.edoDtRoleStaticPermission.updated', { param: param.id });
          // this.alertService().showAlert(message, 'info');
        });
    } else {
      this.roleStaticPermissionService()
        .create(this.roleStaticPermission)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('kdbemdocsuiApp.edoDtRoleStaticPermission.created', { param: param.id });
          // this.alertService().showAlert(message, 'success');
        });
    }
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(roleId): void {
    this.roleService()
      .find(roleId)
      .then(res => {
        this.roles = res;
      });

    // if (this.getJurnals.length === 0) {
    //   this.$store.dispatch('fetchJurnals', { translationService: this.translationService() });
    // }
  }

  public onChangeList({ source, destination }) {
    if (this.destination == null || this.destination.length === 0) {
      this.addRolePermits = destination;
    } else {
      this.deleteRolePermits = this.destination.filter(x => destination.filter(second => second.code === x.code).length === 0);
      this.addRolePermits = destination.filter(x => this.destination.filter(second => second.code === x.code).length === 0);
    }
    this.isChanging = true;
    this.source = source;
    this.destination = destination;
  }

  public getAllPermissions(): void {
    this.isFetching = true;
    this.roleStaticPermissionService()
      .getAllPermissions()
      .then(
        res => {
          const newSource = [];
          res.data.forEach(item => {
            newSource.push({
              name: this.getLabelsList(item),
              code: item,
            });
          });

          this.allSource = newSource;
          this.source = newSource;
          this.setFilterPermissions();
        },
        err => {
          this.isFetching = false;
        }
      );
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
            newDestination.push({
              name: this.getLabelsList(item.staticPermission),
              code: item.staticPermission,
            });
          });

          this.allDestination = newDestination;
          this.destination = newDestination;
          this.filterRolePermissions();
          this.setFilterPermissions();
          this.setFilterDestinationPermissions();
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

  public addRolePermissions(): void {
    const rolePermissions = this.addRolePermits;
    if (rolePermissions === null || rolePermissions.length === 0) {
      return;
    }

    const staticPermissionDto = new RoleStaticPermission();
    const roleList = rolePermissions.map(role => role.code);
    staticPermissionDto.staticPermissions = roleList;
    staticPermissionDto.roleId = this.currentRoleId;

    this.isFetching = true;
    (<any>this.$root).showLoader(true);
    this.roleStaticPermissionService()
      .addRolePermissions(staticPermissionDto)
      .then(
        res => {
          this.isFetching = false;
          (<any>this.$root).showLoader(false);
        },
        err => {
          this.isFetching = false;
          (<any>this.$root).showLoader(false);
        }
      );
  }

  public deleteRolePermissions(): void {
    const rolePermissions = this.deleteRolePermits;
    if (rolePermissions === null || rolePermissions.length === 0) {
      return;
    }

    const staticPermissionDto = new RoleStaticPermission();
    const roleList = rolePermissions.map(role => role.code);
    staticPermissionDto.staticPermissions = roleList;
    staticPermissionDto.roleId = this.currentRoleId;

    (<any>this.$root).showLoader(true);
    this.isFetching = true;
    this.roleStaticPermissionService()
      .deleteRolePermissions(staticPermissionDto)
      .then(
        res => {
          this.isFetching = false;
          (<any>this.$root).showLoader(false);
        },
        err => {
          this.isFetching = false;
          (<any>this.$root).showLoader(false);
        }
      );
  }

  public filterRolePermissions(): void {
    if (this.destination.length > 0) {
      const difference = this.allSource.filter(x => this.destination.filter(second => second.code === x.code).length === 0);
      this.source = difference;
    } else {
      this.source = this.allSource;
    }
  }

  public filterSource(val) {
    if (val === '') {
      this.source = this.allSource;
    }

    this.source = this.sourceByCategory[val];
  }

  public setFilterPermissions() {
    this.sourceByCategory.navbar = this.source.filter(item => item.code.startsWith('Navbar'));
    this.sourceByCategory.subject = this.source.filter(item => item.code.startsWith('Subject'));
    this.sourceByCategory.group = this.source.filter(item => item.code.startsWith('Group'));
    this.sourceByCategory.units = this.source.filter(item => item.code.startsWith('Units'));
    this.sourceByCategory.test = this.source.filter(item => item.code.startsWith('Test'));
    this.sourceByCategory.task = this.source.filter(item => item.code.startsWith('Task'));
    this.sourceByCategory.article = this.source.filter(item => item.code.startsWith('Article'));
  }

  public filterDestination(val) {
    console.log(val)
    if (val === '') {
      this.destination = this.allDestination;
    }
    this.destination = this.destinationByCategory[val];
  }

  public setFilterDestinationPermissions() {
    this.destinationByCategory.navbar = this.destination.filter(item => item.code.startsWith('Navbar'));
    this.destinationByCategory.subject = this.destination.filter(item => item.code.startsWith('Subject'));
    this.destinationByCategory.group = this.destination.filter(item => item.code.startsWith('Group'));
    this.destinationByCategory.units = this.destination.filter(item => item.code.startsWith('Units'));
    this.destinationByCategory.test = this.destination.filter(item => item.code.startsWith('Test'));
    this.destinationByCategory.task = this.destination.filter(item => item.code.startsWith('Task'));
    this.destinationByCategory.article = this.destination.filter(item => item.code.startsWith('Article'));
  }

  public submitRoles(): void {
    this.addRolePermissions();
    this.deleteRolePermissions();
  }

  public getLabelsList(category): any {
    return this.$t('studysystemApp.roleStaticPermission.roleList.' + category);
  }
}
