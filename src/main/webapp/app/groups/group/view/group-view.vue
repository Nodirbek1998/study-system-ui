<template>
  <div class="page page-internal">
    <div>
      <div class="page-header d-flex justify-content-end">
        <div>
          <ul class="list-inline">
            <li class="list-inline-item">
              <b-link class="btn btn-light" @click="handleSyncList">
                {{ $t('studysystemApp.groups.home.refreshListLabel') }}
              </b-link>
            </li>
            <li class="list-inline-item">
              <b-link class="btn btn-primary" @click="handleSyncList">
                {{ $t('studysystemApp.groups.home.refreshListLabel') }}
              </b-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    <div class="alert alert-warning" v-if="group.groupsUsersList && group.groupsUsersList.length === 0">
      <span v-text="$t('studysystemApp.groups.home.notFound')">No groups found</span>
    </div>
    <div class="row">
      <div class="col-6">
        <h2 id="page-heading1" data-cy="GroupsHeading">
          <span v-text="$t('studysystemApp.groups.home.title')" id="groups-heading1">Units</span>
        </h2>
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
            :fields="unitsFields"
            :items="units"
            @sort-changed="changeOrder"
            @row-dblclicked="onSelectRowDbClickUnits"
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
            <template v-slot:head(nameUz)="data">
              <span v-html="$t('studysystemApp.studyUsers.firstName')"></span>
            </template>
            <template v-slot:head(nameRu)="data">
              <span v-html="$t('studysystemApp.studyUsers.lastName')"></span>
            </template>
            <template v-slot:head(nameEn)="data">
              <span v-html="$t('studysystemApp.studyUsers.phone')"></span>
            </template>
            <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(nameUz)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(nameRu)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(nameEn)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
               <b-dropdown-item  class="action-dropdown-item">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('studysystemApp.studyUsers.updated')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
            </template>
          </b-table>
        </div>
      </div>
      <div class="col-6">
        <h2 id="page-heading2" data-cy="GroupsHeading">
          <span v-text="$t('studysystemApp.groups.home.title')" id="groups-heading2">Users</span>
        </h2>
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
            :fields="userFields"
            :items="group.groupsUsersList"
            @sort-changed="changeOrder"
            @row-dblclicked="onSelectRowDbClickUsers"
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
            <template v-slot:head(phone)="data">
              <span v-html="$t('studysystemApp.studyUsers.phone')"></span>
            </template>
            <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(firstName)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(lastName)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(phone)="data"><span>{{ data.value }}</span></template>
            <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
               <b-dropdown-item  class="action-dropdown-item">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('studysystemApp.studyUsers.updated')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <div v-show="users && users.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./group-view.component.ts">
</script>

<style scoped>

</style>
