<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.taskAnswer.home.createOrEditLabel"
          data-cy="TaskAnswerCreateUpdateHeading"
          v-text="$t('studysystemApp.taskAnswer.home.createOrEditLabel')"
        >
          Create or edit a TaskAnswer
        </h2>
        <div>
          <div class="form-group" v-if="taskAnswer.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="taskAnswer.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.taskAnswer.createdAt')" for="task-answer-createdAt"
              >Created At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="task-answer-createdAt"
                  v-model="$v.taskAnswer.createdAt.$model"
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
                id="task-answer-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.taskAnswer.createdAt.$invalid, invalid: $v.taskAnswer.createdAt.$invalid }"
                v-model="$v.taskAnswer.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.taskAnswer.updatedAt')" for="task-answer-updatedAt"
              >Updated At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="task-answer-updatedAt"
                  v-model="$v.taskAnswer.updatedAt.$model"
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
                id="task-answer-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.taskAnswer.updatedAt.$invalid, invalid: $v.taskAnswer.updatedAt.$invalid }"
                v-model="$v.taskAnswer.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label v-text="$t('studysystemApp.taskAnswer.studyUser')" for="task-answer-studyUser">Study User</label>
            <select
              class="form-control"
              id="task-answer-studyUsers"
              data-cy="studyUser"
              multiple
              name="studyUser"
              v-if="taskAnswer.studyUsers !== undefined"
              v-model="taskAnswer.studyUsers"
            >
              <option
                v-bind:value="getSelected(taskAnswer.studyUsers, studyUsersOption)"
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
            :disabled="$v.taskAnswer.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./task-answer-update.component.ts"></script>
