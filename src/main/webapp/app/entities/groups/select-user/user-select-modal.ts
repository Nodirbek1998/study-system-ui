import { Component, Inject, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';
import { ISelectModel } from '@/shared/model/select/select-model';
import TranslationService from '@/locale/translation.service';

import AccountService from '@/account/account.service';
import EdoListBox from '@/shared/listbox/list_box.vue';
import JhiDataUtils from '@/shared/data/data-utils.service';
import UserVacationPopupComponents from '@/components/user-select/user-vacation-popup.vue';
import { mapGetters } from 'vuex';
import DepartmentSelect from '@/components/department-selectbox/demaprtment-select.vue';
import {IUser} from "@/shared/model/user.model";
import UserService from "@/entities/user/user.service";
import StudyUsersService from "@/entities/study-users/study-users.service";
import {IStudyUsers} from "@/shared/model/study-users.model";

@Component({
  components: {
    EdoListBox,
    UserVacationPopupComponents,
    DepartmentSelect,
  },
  computed: {
    ...mapGetters({
      branches: 'branches',
      departments: 'currentUserDepartments',
    }),
  },
})
export default class UserSelectModal extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('userService') private userService: () => StudyUsersService;
  public dataUtilsService: JhiDataUtils;
  public users: IStudyUsers[] = [];

  public edoDtDepartments: ISelectModel[] = [];
  @Prop({ default: '' }) title!: string;
  @Prop({ default: false }) isSingleSelect!: boolean;
  @Prop({ default: 1 }) userType!: number;
  @Prop({ default: true }) showHeadType!: boolean;
  @PropSync('isShow', { type: Boolean }) syncedVisible!: boolean;
  @PropSync('isShowNavHead', { type: Boolean, default: true }) showNavHead!: boolean;
  @PropSync('isShowNavManagement', { type: Boolean, default: true }) showNavManagement!: boolean;
  @PropSync('isTemplateUsers', { type: Boolean, default: false }) isTempUsers!: boolean;
  @PropSync('selectedUsers', { type: Array }) selectedItemUsers!: IUser[];

  public isSaving = false;
  public currentLanguage = '';
  public searchword = '';
  public selects: IUser[] = [];
  public currentTypeAllUsers: IUser[] = [];
  public headType = 'All';
  public selectDepartmentId = null;
  public selectBranchId = null;
  public isVacationPopoverLoading = false;
  public selectAllModel = false;
  public Department = true;
  public Branch = false;

  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public isFetching = false;
  public reverse = false;
  public itemsPerPage = 20;
  public totalItems = 0;
  public queryCount: number = null;

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.dataUtilsService = new JhiDataUtils();
    this.retrieveInits();
  }

  mounted() {
    this.$root.$on('bv::modal::hidden', (bvEvent, modalId) => {
      if (modalId === 'user-select-add-modal') {
        this.$emit('hideUserModel', false);
        this.headType = 'management';
        this.searchword = '';
        this.selects = [];
        this.selectDepartmentId = null;
      }
    });
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId === 'user-select-add-modal') {
        if (!this.showHeadType) {
          // for information type is selected automatically all users can be
          this.headType = 'All';
        }
        this.retrieveInits();
        this.selects = [];
      }
    });
  }

  public get currentUser(): IStudyUsers {
    return this.$store.getters.account ? this.$store.getters.account : {};
  }

  public retrieveInits(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.userService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.users = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }
  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public onChangeHead(head): void {
    this.headType = head;
    this.clearSelectedUserStyle();
  }



  public renderUserList() {
    const list = [];
    const selectedUserMap = [];
    if (this.selectedItemUsers && this.selectedItemUsers.length > 0) {
      if (this.isSingleSelect) {
        selectedUserMap[this.selectedItemUsers[0].id] = this.selectedItemUsers[0];
      } else {
        this.selectedItemUsers.forEach(value => {
          selectedUserMap[value.id] = value;
        });
      }
    }
    this.users.forEach(user => {
      if (selectedUserMap[user.id] && this.selects.filter(su => su.id === user.id).length === 0) {
        /*//chap tomonda ham shu user bor yo'qligi tekshiriladi*/
        this.selects.push(user);
      }
    });
    this.currentTypeAllUsers.forEach(user => {
      user.label = user.firstName;

      if (!selectedUserMap[user.id]) {
        list.push(user);
      } else if (this.selects.filter(su => su.id === user.id).length === 0) {
        /*//chap tomonda ham shu user bor yo'qligi tekshiriladi*/
        this.selects.push(user);
      }
    });

    this.users = this.dataUtilsService.removeAllElements(this.users);
    this.users = list;
  }

  public onSubmitSelectUser(): void {
    this.$emit('selectedUserFromModal', this.selects, this.userType);
  }

  public addToRight(): void {
    const leftUserMap = [];
    if (this.selects) {
      this.selects.forEach(value => {
        leftUserMap[value.id] = value;
      });
    }
    console.log('single select ', this.isSingleSelect);
    this.users.forEach((value, index) => {
      if (value.checked && !leftUserMap[value.id]) {
        if (this.isSingleSelect) {
          this.selects = [];
        }
        this.selects.push(value);
        value.checked = false;
      }
    });
  }

  public addToLeft(): void {
    const removeIndex = [];
    this.selects.forEach((value, index) => {
      if (value.checked) {
        removeIndex.push(index);
      }
    });
    this.selects = this.dataUtilsService.removeItemWithIndexes(this.selects, removeIndex);
  }

  public addToRightThisItem(userId): void {
    const objIndex = this.users.findIndex(obj => obj.id === userId);
    const haveThisItem = this.selects.findIndex(obj => obj.id === userId);
    this.users[objIndex].checked = true;
    if (haveThisItem < 0) {
      if (this.isSingleSelect) {
        this.selects = [];
      }
      this.selects.push(this.users[objIndex]);
    }
    this.setActiveClassToCard(userId, true);
  }

  public removeFromLeftThisItem(userId): void {
    const index = this.selects.findIndex(obj => obj.id === userId);
    this.selects[index].checked = false;
    this.selects.splice(index, 1);
    this.setActiveClassToCard(userId, false);
  }

  public get getUserList(): IUser[] {
    let searchList: IUser[] = [];
    if (this.searchword) {
      searchList = this.users.filter(
        value =>
          value.firstName.toLowerCase().includes(this.searchword.toLowerCase()) ||
          value.firstName.toLowerCase().includes(this.searchword.toLowerCase())
      );
    } else {
      searchList = this.users;
    }
    return searchList;
  }

  public clearAll(): void {
    this.selects = [];
    const list: IUser[] = [];
    this.currentTypeAllUsers.forEach(user => {
      user.label = user.firstName;

      user.checked = false;
      list.push(user);
      this.setActiveClassToCard(user.id, false);
    });
    this.users = this.dataUtilsService.removeAllElements(this.users);
    this.users = list;
  }

  public refreshUsers(): void {
    this.retrieveInits();
  }

  public selectAll(event): void {
    const searchList: IUser[] = [];
    this.users.forEach(value => {
      value.checked = event;
      searchList.push(value);
      this.setActiveClassToCard(value.id, event);
    });

    this.users = searchList;
  }

  // public onShown(userId): void {
  //   if (!userId) {
  //     return;
  //   }
  //   this.isVacationPopoverLoading = true;
  //   this.userService()
  //     .retrieve(userId)
  //     .then(res => {
  //       this.isVacationPopoverLoading = false;
  //       if (res.data && res.data.length > 0) {
  //         this.vacationData = res.data[0];
  //       } else {
  //         this.vacationData = null;
  //       }
  //     })
  //     .catch(err => {
  //       this.isVacationPopoverLoading = false;
  //       (<any>this.$root).toastFailed(err);
  //     });
  // }

  public setActiveClassToCard(id, isChecked): void {
    const card = document.getElementById('card-id-' + id.toString());
    if (isChecked) {
      card?.classList?.add('active');
    } else {
      card?.classList?.remove('active');
    }
  }

  public clearSelectedUserStyle(): void {
    const users = this.getUserList.filter(item => item.checked);
    users.forEach(item => {
      this.setActiveClassToCard(item.id, false);
    });
  }

  public getStatusName(status: string): string {
    if (!status) {
      return this.$t('approval.userSelect.onVacation').toString();
    }
    return status.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
