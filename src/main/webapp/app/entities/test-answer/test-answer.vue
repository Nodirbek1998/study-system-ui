<template>
  <div>
    <h2 id="page-heading" data-cy="TestAnswerHeading">
      <span id="test-answer-heading">Test Answers</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'TestAnswerCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-test-answer"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Test Answer </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && testAnswers && testAnswers.length === 0">
      <span>No testAnswers found</span>
    </div>
    <div class="table-responsive" v-if="testAnswers && testAnswers.length > 0">
      <table class="table table-striped" aria-describedby="testAnswers">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span>Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('updatedAt')">
              <span>Updated At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('right')">
              <span>Right</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'right'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="testAnswer in testAnswers" :key="testAnswer.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TestAnswerView', params: { testAnswerId: testAnswer.id } }">{{ testAnswer.id }}</router-link>
            </td>
            <td>{{ testAnswer.createdAt }}</td>
            <td>{{ testAnswer.updatedAt }}</td>
            <td>{{ testAnswer.right }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TestAnswerView', params: { testAnswerId: testAnswer.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TestAnswerEdit', params: { testAnswerId: testAnswer.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(testAnswer)"
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
        ><span id="studysystemApp.testAnswer.delete.question" data-cy="testAnswerDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-testAnswer-heading">Are you sure you want to delete this Test Answer?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-testAnswer"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeTestAnswer()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="testAnswers && testAnswers.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./test-answer.component.ts"></script>
