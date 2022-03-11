<template>
  <div>
    <h2 id="page-heading" data-cy="TestQuestionHeading">
      <span id="test-question-heading">Test Questions</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'TestQuestionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-test-question"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Test Question </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && testQuestions && testQuestions.length === 0">
      <span>No testQuestions found</span>
    </div>
    <div class="table-responsive" v-if="testQuestions && testQuestions.length > 0">
      <table class="table table-striped" aria-describedby="testQuestions">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('level')">
              <span>Level</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'level'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('answerA')">
              <span>Answer A</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'answerA'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('answerB')">
              <span>Answer B</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'answerB'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('answerC')">
              <span>Answer C</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'answerC'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('answerD')">
              <span>Answer D</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'answerD'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('test.id')">
              <span>Test</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'test.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="testQuestion in testQuestions" :key="testQuestion.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TestQuestionView', params: { testQuestionId: testQuestion.id } }">{{
                testQuestion.id
              }}</router-link>
            </td>
            <td>{{ testQuestion.name }}</td>
            <td>{{ testQuestion.level }}</td>
            <td>{{ testQuestion.answerA }}</td>
            <td>{{ testQuestion.answerB }}</td>
            <td>{{ testQuestion.answerC }}</td>
            <td>{{ testQuestion.answerD }}</td>
            <td>
              <div v-if="testQuestion.test">
                <router-link :to="{ name: 'TestsView', params: { testsId: testQuestion.test.id } }">{{ testQuestion.test.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TestQuestionView', params: { testQuestionId: testQuestion.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TestQuestionEdit', params: { testQuestionId: testQuestion.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(testQuestion)"
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
        ><span id="studysystemApp.testQuestion.delete.question" data-cy="testQuestionDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-testQuestion-heading">Are you sure you want to delete this Test Question?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-testQuestion"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeTestQuestion()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="testQuestions && testQuestions.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./test-question.component.ts"></script>
