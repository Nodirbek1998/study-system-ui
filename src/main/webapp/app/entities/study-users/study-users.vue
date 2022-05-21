<template>
  <div  class="page page-internal">
    <h2 id="page-heading" data-cy="StudyUsersHeading">
      <span v-text="$t('studysystemApp.studyUsers.home.title')" id="study-users-heading">Study Users</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.studyUsers.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'StudyUserCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-study-users"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.studyUsers.home.createLabel')"> Create a new Study Users </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && studyUsers && studyUsers.length === 0">
      <span v-text="$t('studysystemApp.studyUsers.home.notFound')">No studyUsers found</span>
    </div>

    <add-role-component
      :is-show="isShowRoleModal"
      @hideRoleModel="hideUserModal"
      :userId="selectedUserId"
      :selectUserName="selectedUserName">
    </add-role-component>
    <div class="table-wrapper" >
      <b-table
        ref="selectTable"
        id="table"
        :small="tableOptions.small"
        :responsive="tableOptions.responsive"
        :borderless="tableOptions.borderless"
        :outlined="tableOptions.outlined"
        :hover="tableOptions.hover"
        :fixed="tableOptions.fixed"
        :sticky-header="tableOptions.stickyHeader"
        :selectable="tableOptions.selectable"
        :select-mode="tableOptions.selectMode"
        :fields="fields"
        :items="studyUsers"
        @sort-changed="changeOrder"
        @row-dblclicked="onSelectRowDbClick"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong v-text="$t('global.loading')">Loading...</strong>
          </div>
        </template>
        <template v-slot:head(id)="data">
          <span v-html="$t('studysystemApp.studyUsers.id')"></span>
        </template>
        <template v-slot:head(firstName)="data">
          <span v-html="$t('studysystemApp.studyUsers.firstName')"></span>
        </template>
        <template v-slot:head(lastName)="data">
          <span v-html="$t('studysystemApp.studyUsers.lastName')"></span>
        </template>
        <template v-slot:head(age)="data">
          <span v-html="$t('studysystemApp.studyUsers.age')"></span>
        </template>
        <template v-slot:head(email)="data">
          <span v-html="$t('studysystemApp.studyUsers.email')"></span>
        </template>
        <template v-slot:head(phone)="data">
          <span v-html="$t('studysystemApp.studyUsers.phone')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(firstName)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(lastName)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(age)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(email)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(phone)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
              <b-dropdown-item @click="onDependRole(row.item)" class="action-dropdown-item">
                  <font-awesome-icon icon="download" class="mr-2"></font-awesome-icon>
                  {{ $t('hr.manageUser') }}
              </b-dropdown-item>
               <b-dropdown-item  class="action-dropdown-item" @click="onClickEdit(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('studysystemApp.studyUsers.updated')}}
                </b-dropdown-item>
                <b-dropdown-item  class="action-dropdown-item" @click="prepareRemove(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="trash"/>
                  {{$t('studysystemApp.studyUsers.deleted')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
    <div v-show="studyUsers && studyUsers.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./study-users.component.ts"></script>
