import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import StudyUsersService from '@/entities/study-users/study-users.service';
import { IStudyUsers } from '@/shared/model/study-users.model';

import SubjectsService from '@/entities/subjects/subjects.service';
import { ISubjects } from '@/shared/model/subjects.model';

import { IGroups, Groups } from '@/shared/model/groups.model';
import GroupsService from './groups.service';
import OpenUserSelect from '@/entities/groups/select-user/user-select-modal.vue';
import {User} from "@/shared/model/user.model";

const validations: any = {
  groups: {
    name: {},
    createdAt: {},
    updatedAt: {},
  },
};

@Component({
  validations,
  components:{
    OpenUserSelect,
  }
})
export default class GroupsUpdate extends Vue {
  @Inject('groupsService') private groupsService: () => GroupsService;
  @Inject('alertService') private alertService: () => AlertService;

  public groups: IGroups = new Groups();

  @Inject('studyUsersService') private studyUsersService: () => StudyUsersService;

  public studyUsers: IStudyUsers[] = [];

  @Inject('subjectsService') private subjectsService: () => SubjectsService;

  public subjects: ISubjects[] = [];
  public isSaving = false;
  public currentLanguage = '';
  public page = 1;
  public previousPage = 1;
  public itemsPerPage = 20;
  public reverse = false;
  public propOrder = 'id';
  public isShowUserModal = false;

  public userSelectModalTitle = '';
  public currentUserType = 1;
  public modalSelectedUsers = [];

  public users: number[] = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.groupsId) {
        vm.retrieveGroups(to.params.groupsId);
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
    this.groups.studyUsers = [];
    this.groups.subjects = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.groups.id) {
      this.groupsService()
        .update(this.groups)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.groups.updated', { param: param.id });
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
      this.groupsService()
        .create(this.groups)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('studysystemApp.groups.created', { param: param.id });
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

  public retrieveGroups(groupsId): void {
    this.groupsService()
      .find(groupsId)
      .then(res => {
        this.groups = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.studyUsersService()
      .retrieve(paginationQuery)
      .then(res => {
        this.studyUsers = res.data;
      });
    this.subjectsService()
      .retrieve(paginationQuery)
      .then(res => {
        this.subjects = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public hideUserModal(isShow): void {
    this.isShowUserModal = isShow;
  }

  public selectedUserFromModal(selectedUsers: User[]): void {

      this.users = selectedUsers.map(value => value.id);
      this.groups.usersNameList = selectedUsers.map(value => value.firstName);

  }


}
