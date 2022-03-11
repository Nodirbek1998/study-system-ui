<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.testAnswer.home.createOrEditLabel"
          data-cy="TestAnswerCreateUpdateHeading"
          v-text="$t('studysystemApp.testAnswer.home.createOrEditLabel')"
        >
          Create or edit a TestAnswer
        </h2>
        <div>
          <div class="form-group" v-if="testAnswer.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="testAnswer.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.testAnswer.createdAt')" for="test-answer-createdAt"
              >Created At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="test-answer-createdAt"
                  v-model="$v.testAnswer.createdAt.$model"
                  name="createdAt"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="test-answer-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.testAnswer.createdAt.$invalid, invalid: $v.testAnswer.createdAt.$invalid }"
                v-model="$v.testAnswer.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.testAnswer.updatedAt')" for="test-answer-updatedAt"
              >Updated At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="test-answer-updatedAt"
                  v-model="$v.testAnswer.updatedAt.$model"
                  name="updatedAt"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="test-answer-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.testAnswer.updatedAt.$invalid, invalid: $v.testAnswer.updatedAt.$invalid }"
                v-model="$v.testAnswer.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.testAnswer.right')" for="test-answer-right">Right</label>
            <input
              type="checkbox"
              class="form-check"
              name="right"
              id="test-answer-right"
              data-cy="right"
              :class="{ valid: !$v.testAnswer.right.$invalid, invalid: $v.testAnswer.right.$invalid }"
              v-model="$v.testAnswer.right.$model"
            />
          </div>
          <div class="form-group">
            <label v-text="$t('studysystemApp.testAnswer.studyUser')" for="test-answer-studyUser">Study User</label>
            <select
              class="form-control"
              id="test-answer-studyUsers"
              data-cy="studyUser"
              multiple
              name="studyUser"
              v-if="testAnswer.studyUsers !== undefined"
              v-model="testAnswer.studyUsers"
            >
              <option
                v-bind:value="getSelected(testAnswer.studyUsers, studyUsersOption)"
                v-for="studyUsersOption in studyUsers"
                :key="studyUsersOption.id"
              >
                {{ studyUsersOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.testAnswer.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./test-answer-update.component.ts"></script>
