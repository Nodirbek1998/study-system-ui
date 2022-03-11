<template>
  <div>
    <h2 id="page-heading" data-cy="StudyLogsHeading">
      <span v-text="$t('studysystemApp.studyLogs.home.title')" id="study-logs-heading">Study Logs</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.studyLogs.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'StudyLogsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-study-logs"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.studyLogs.home.createLabel')"> Create a new Study Logs </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && studyLogs && studyLogs.length === 0">
      <span v-text="$t('studysystemApp.studyLogs.home.notFound')">No studyLogs found</span>
    </div>
    <div class="table-responsive" v-if="studyLogs && studyLogs.length > 0">
      <table class="table table-striped" aria-describedby="studyLogs">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('operationName')">
              <span v-text="$t('studysystemApp.studyLogs.operationName')">Operation Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'operationName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('clientIp')">
              <span v-text="$t('studysystemApp.studyLogs.clientIp')">Client Ip</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'clientIp'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('host')">
              <span v-text="$t('studysystemApp.studyLogs.host')">Host</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'host'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span v-text="$t('studysystemApp.studyLogs.createdAt')">Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('actionType')">
              <span v-text="$t('studysystemApp.studyLogs.actionType')">Action Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'actionType'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('studyUser.id')">
              <span v-text="$t('studysystemApp.studyLogs.studyUser')">Study User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'studyUser.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="studyLogs in studyLogs" :key="studyLogs.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'StudyLogsView', params: { studyLogsId: studyLogs.id } }">{{ studyLogs.id }}</router-link>
            </td>
            <td>{{ studyLogs.operationName }}</td>
            <td>{{ studyLogs.clientIp }}</td>
            <td>{{ studyLogs.host }}</td>
            <td>{{ studyLogs.createdAt }}</td>
            <td v-text="$t('studysystemApp.EnumActionType.' + studyLogs.actionType)">{{ studyLogs.actionType }}</td>
            <td>
              <div v-if="studyLogs.studyUser">
                <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: studyLogs.studyUser.id } }">{{
                  studyLogs.studyUser.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'StudyLogsView', params: { studyLogsId: studyLogs.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'StudyLogsEdit', params: { studyLogsId: studyLogs.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(studyLogs)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.studyLogs.delete.question" data-cy="studyLogsDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-studyLogs-heading" v-text="$t('studysystemApp.studyLogs.delete.question', { id: removeId })">
          Are you sure you want to delete this Study Logs?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-studyLogs"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeStudyLogs()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="studyLogs && studyLogs.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./study-logs.component.ts"></script>
