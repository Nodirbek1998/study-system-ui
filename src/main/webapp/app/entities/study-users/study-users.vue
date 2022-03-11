<template>
  <div>
    <h2 id="page-heading" data-cy="StudyUsersHeading">
      <span v-text="$t('studysystemApp.studyUsers.home.title')" id="study-users-heading">Study Users</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.studyUsers.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'StudyUsersCreate' }" custom v-slot="{ navigate }">
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
    <div class="table-responsive" v-if="studyUsers && studyUsers.length > 0">
      <table class="table table-striped" aria-describedby="studyUsers">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('fullName')">
              <span v-text="$t('studysystemApp.studyUsers.fullName')">Full Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'fullName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('age')">
              <span v-text="$t('studysystemApp.studyUsers.age')">Age</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'age'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('phone')">
              <span v-text="$t('studysystemApp.studyUsers.phone')">Phone</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phone'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('email')">
              <span v-text="$t('studysystemApp.studyUsers.email')">Email</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('username')">
              <span v-text="$t('studysystemApp.studyUsers.username')">Username</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'username'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('password')">
              <span v-text="$t('studysystemApp.studyUsers.password')">Password</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'password'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span v-text="$t('studysystemApp.studyUsers.createdAt')">Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('updatedAt')">
              <span v-text="$t('studysystemApp.studyUsers.updatedAt')">Updated At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('role.id')">
              <span v-text="$t('studysystemApp.studyUsers.role')">Role</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'role.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="studyUsers in studyUsers" :key="studyUsers.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: studyUsers.id } }">{{ studyUsers.id }}</router-link>
            </td>
            <td>{{ studyUsers.fullName }}</td>
            <td>{{ studyUsers.age }}</td>
            <td>{{ studyUsers.phone }}</td>
            <td>{{ studyUsers.email }}</td>
            <td>{{ studyUsers.username }}</td>
            <td>{{ studyUsers.password }}</td>
            <td>{{ studyUsers.createdAt }}</td>
            <td>{{ studyUsers.updatedAt }}</td>
            <td>
              <div v-if="studyUsers.role">
                <router-link :to="{ name: 'RoleView', params: { roleId: studyUsers.role.id } }">{{ studyUsers.role.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: studyUsers.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'StudyUsersEdit', params: { studyUsersId: studyUsers.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(studyUsers)"
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
        ><span id="studysystemApp.studyUsers.delete.question" data-cy="studyUsersDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-studyUsers-heading" v-text="$t('studysystemApp.studyUsers.delete.question', { id: removeId })">
          Are you sure you want to delete this Study Users?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-studyUsers"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeStudyUsers()"
        >
          Delete
        </button>
      </div>
    </b-modal>
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
