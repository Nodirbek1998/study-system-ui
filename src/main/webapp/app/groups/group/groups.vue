<template>
  <div class="page page-internal">
    <h2 id="page-heading" data-cy="GroupsHeading">
      <span v-text="$t('studysystemApp.groups.home.title')" id="groups-heading">Groups</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" >
          <font-awesome-icon icon="sync" ></font-awesome-icon>
          <span v-text="$t('studysystemApp.groups.home.refreshListLabel')">Refresh List</span>
        </button>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="groups && groups.length === 0">
      <span v-text="$t('studysystemApp.groups.home.notFound')">No groups found</span>
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
        :items="groups"
        @row-dblclicked="onSelectRowDbClick"
        @sort-changed="changeOrder"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong v-text="$t('global.loading')">Loading...</strong>
          </div>
        </template>
        <template v-slot:head(id)="data">
          <span v-html="$t('global.field.id')"></span>
        </template>
        <template v-slot:head(name)="data">
          <span v-html="$t('studysystemApp.groups.name')"></span>
        </template>
<!--        <template v-slot:head(createdAt)="data">-->
<!--          <span v-html="$t('studysystemApp.groups.createdAt')"></span>-->
<!--        </template>-->
<!--        <template v-slot:head(updatedAt)="data">-->
<!--          <span v-html="$t('studysystemApp.groups.updatedAt')"></span>-->
<!--        </template>-->
        <template v-slot:head(action)="data">
          <span v-html="$t('studysystemApp.groups.action')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(name)="data"><span>{{ data.value }}</span></template>
<!--        <template v-slot:cell(createdAt)="data"><span>{{ data.value }}</span></template>-->
<!--        <template v-slot:cell(updatedAt)="data"><span>{{ data.value }}</span></template>-->
        <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.groups.delete.question" data-cy="groupsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-groups-heading" v-text="$t('studysystemApp.groups.delete.question', { id: removeId })">
          Are you sure you want to delete this Groups?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-groups"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeGroups()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="groups && groups.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./groups.component.ts"></script>
