<template>
  <div>
    <h2 id="page-heading" data-cy="TaskHeading">
      <span v-text="$t('studysystemApp.task.home.title')" id="task-heading">Tasks</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.task.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'TaskCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-task">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.task.home.createLabel')"> Create a new Task </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && tasks && tasks.length === 0">
      <span v-text="$t('studysystemApp.task.home.notFound')">No tasks found</span>
    </div>
    <div class="table-wrapper" v-if="tasks && tasks.length > 0">
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
        :items="tasks"
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
          <span v-html="$t('studysystemApp.article.id')"></span>
        </template>
        <template v-slot:head(topic)="data">
          <span v-html="$t('studysystemApp.article.name')"></span>
        </template>
        <template v-slot:head(deadline)="data">
          <span v-html="$t('studysystemApp.article.text')"></span>
        </template>
        <template v-slot:head(time)="data">
          <span v-html="$t('studysystemApp.article.text')"></span>
        </template>
        <template v-slot:head(filesDTO)="data">
          <span v-html="$t('studysystemApp.article.text')"></span>
        </template>
        <template v-slot:cell(id)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(topic)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(deadline)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(time)="data"><span>{{ data.value }}</span></template>
        <template v-slot:cell(filesDTO)="data"><span>{{ data.value.name }}</span></template>
        <template v-slot:cell(action)="row">
          <span>
            <b-dropdown no-caret variant="link" class="action-dropdown" size="lg">
              <template #button-content>
                  <font-awesome-icon class="icon" icon="ellipsis-v" size="xs"/>
              </template>
               <b-dropdown-item  class="action-dropdown-item" @click="onClickEdit(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="edit"/>
                  {{$t('entity.action.edit')}}
                </b-dropdown-item>
                <b-dropdown-item  class="action-dropdown-item" @click="prepareRemove(row.item.id)">
                  <font-awesome-icon class="icon mr-1" icon="trash"/>
                  {{$t('entity.action.delete')}}
                </b-dropdown-item>
            </b-dropdown>
          </span>
        </template>
      </b-table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.task.delete.question" data-cy="taskDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-task-heading" v-text="$t('studysystemApp.task.delete.question', { id: removeId })">
          Are you sure you want to delete this Task?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-task"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeTask()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="tasks && tasks.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./task.component.ts"></script>
