import { Module } from 'vuex';
import { ISelectModel, SelectModel } from '@/shared/model/select/select-model';
import UserService from "@/entities/user/user.service";
import SubjectsService from "@/entities/subjects/subjects.service";
import TranslationService from "@/locale/translation.service";
import GroupsService from "@/entities/groups/groups.service";
import {IGroups} from "@/shared/model/groups.model";

const userService: UserService = new UserService();
const subjectsService: SubjectsService = new SubjectsService();
const groupsService: SubjectsService = new GroupsService();

const paginationQuery = {
  page: 0,
  size: 100,
  sort: ['id,asc'],
};

export const sidebarStore: Module<any, any> = {
  state: {
    users: [],
    subjects: [],
    groups: [],
  },
  getters: {
    users: state => state.users,
    subjects: state => state.subjects,
    groups: state => state.groups,
  },
  mutations: {
    updateUsers(state, list: ISelectModel[] = []) {
      state.users = list;
    },
    updateSubjects(state, list: ISelectModel[] = []) {
      state.subjects = list;
    },
    updateGroups(state, list: IGroups[] = []) {
      state.groups = list;
    },
  },
  actions: {
    fetchUsers(ctx) {
      const pQuery = {
        page: 0,
        size: 100,
        sort: ['id,asc'],
      };
      userService
        .retrieve(pQuery)
        .then(res => {
          const u = res.data.map(value => {
            const m = new SelectModel();
            m.id = value.id;
            m.label = value.firstName;
            m.item = value;
            return m;
          });
          ctx.commit('updateUsers', u);
        })
        .catch(err => {
          ctx.commit('updateUsers', []);
        });
    },

    fetchSubjects(ctx, payload) {
      const translationService: TranslationService = payload.translationService;
      const query = Object.assign({}, payload || {});
      query.page = 0;
      query.size = 100;
      query.sort = ['id,asc'];
      subjectsService
        .retrieve(query)
        .then(res => {
          const l = translationService.selectBoxOptions(res.data);
            ctx.commit('updateSubjects', l);
        })
        .catch(err => {
          ctx.commit('updateSubjects', []);
        });
    },
    fetchGroups(ctx, payload) {
      const pQuery = {
        page: 0,
        size: 100,
        sort: ['id,asc'],
      };
      const  query: any = payload;
      console.log(query);
      if (!query.subjectId){
        groupsService
          .retrieve(pQuery)
          .then(res => {
            ctx.commit('updateGroups', res.data);
          })
          .catch(err => {
            ctx.commit('updateGroups', []);
          });
      }else{
        subjectsService
          .find(query.subjectId)
          .then(res => {
            ctx.commit('updateGroups', res.groupsDTOS);
          })
          .catch(err => {
            ctx.commit('updateGroups', []);
          });
      }
    },
  },
};
