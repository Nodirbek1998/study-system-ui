<template>
  <div class="page page-internal">
    <h2 id="page-heading" data-cy="RoleHeading">
      <span v-text="$t('studysystemApp.role.home.title')" id="role-heading">Roles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.role.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'RoleCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-role">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.role.home.createLabel')"> Create a new Role </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && roles && roles.length === 0">
      <span v-text="$t('studysystemApp.role.home.notFound')">No roles found</span>
    </div>
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
        :items="roles"
        @sort-changed="changeOrder"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong v-text="$t('global.loading')">Loading...</strong>
          </div>
        </template>
        <template v-slot:head(id)="data">
          <span v-html="$t('studysystemApp.role.id')"></span>
        </template>
        <template v-slot:head(nameUz)="data">
          <span v-html="$t('studysystemApp.role.nameUz')"></span>
        </template>
        <template v-slot:head(nameRu)="data">
          <span v-html="$t('studysystemApp.role.nameRu')"></span>
        </template>
        <template v-slot:head(nameEn)="data">
          <span v-html="$t('studysystemApp.role.nameEn')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(nameEn)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(nameRu)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(nameEn)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
               <b-dropdown-item  class="action-dropdown-item" @click="onClickEdit(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('studysystemApp.role.updated')}}
                </b-dropdown-item>
                <b-dropdown-item  class="action-dropdown-item" @click="prepareRemove(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="trash"/>
                  {{$t('studysystemApp.role.deleted')}}
                </b-dropdown-item>
                <b-dropdown-item  class="action-dropdown-item" @click="onAddGroupPermit(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="plus"/>
                  {{$t('studysystemApp.role.addRole')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
    <div v-show="roles && roles.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./role.component.ts"></script>
