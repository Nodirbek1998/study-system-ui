<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="studysystemApp.testQuestion.home.createOrEditLabel" data-cy="TestQuestionCreateUpdateHeading">
          Create or edit a TestQuestion
        </h2>
        <div>
          <div class="form-group" v-if="testQuestion.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="testQuestion.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="test-question-name"
              data-cy="name"
              :class="{ valid: !$v.testQuestion.name.$invalid, invalid: $v.testQuestion.name.$invalid }"
              v-model="$v.testQuestion.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-level">Level</label>
            <input
              type="number"
              class="form-control"
              name="level"
              id="test-question-level"
              data-cy="level"
              :class="{ valid: !$v.testQuestion.level.$invalid, invalid: $v.testQuestion.level.$invalid }"
              v-model.number="$v.testQuestion.level.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-answerA">Answer A</label>
            <input
              type="checkbox"
              class="form-check"
              name="answerA"
              id="test-question-answerA"
              data-cy="answerA"
              :class="{ valid: !$v.testQuestion.answerA.$invalid, invalid: $v.testQuestion.answerA.$invalid }"
              v-model="$v.testQuestion.answerA.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-answerB">Answer B</label>
            <input
              type="checkbox"
              class="form-check"
              name="answerB"
              id="test-question-answerB"
              data-cy="answerB"
              :class="{ valid: !$v.testQuestion.answerB.$invalid, invalid: $v.testQuestion.answerB.$invalid }"
              v-model="$v.testQuestion.answerB.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-answerC">Answer C</label>
            <input
              type="checkbox"
              class="form-check"
              name="answerC"
              id="test-question-answerC"
              data-cy="answerC"
              :class="{ valid: !$v.testQuestion.answerC.$invalid, invalid: $v.testQuestion.answerC.$invalid }"
              v-model="$v.testQuestion.answerC.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-answerD">Answer D</label>
            <input
              type="checkbox"
              class="form-check"
              name="answerD"
              id="test-question-answerD"
              data-cy="answerD"
              :class="{ valid: !$v.testQuestion.answerD.$invalid, invalid: $v.testQuestion.answerD.$invalid }"
              v-model="$v.testQuestion.answerD.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="test-question-test">Test</label>
            <select class="form-control" id="test-question-test" data-cy="test" name="test" v-model="testQuestion.test">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="testQuestion.test && testsOption.id === testQuestion.test.id ? testQuestion.test : testsOption"
                v-for="testsOption in tests"
                :key="testsOption.id"
              >
                {{ testsOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.testQuestion.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./test-question-update.component.ts"></script>
