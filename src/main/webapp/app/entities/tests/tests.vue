<template>
  <div>
    <h2 id="page-heading" data-cy="TestsHeading">
      <span id="tests-heading">Tests</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'TestsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-tests"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Tests </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && tests && tests.length === 0">
      <span>No tests found</span>
    </div>
    <div class="table-responsive" v-if="tests && tests.length > 0">
      <table class="table table-striped" aria-describedby="tests">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('status')">
              <span>Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('deadline')">
              <span>Deadline</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'deadline'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('subject.id')">
              <span>Subject</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'subject.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tests in tests" :key="tests.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TestsView', params: { testsId: tests.id } }">{{ tests.id }}</router-link>
            </td>
            <td>{{ tests.name }}</td>
            <td>{{ tests.status }}</td>
            <td>{{ tests.deadline }}</td>
            <td>
              <div v-if="tests.subject">
                <router-link :to="{ name: 'SubjectsView', params: { subjectsId: tests.subject.id } }">{{ tests.subject.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TestsView', params: { testsId: tests.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TestsEdit', params: { testsId: tests.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(tests)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="studysystemApp.tests.delete.question" data-cy="testsDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-tests-heading">Are you sure you want to delete this Tests?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-tests"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeTests()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="tests && tests.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./tests.component.ts"></script>
