<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="studysystemApp.task.home.createOrEditLabel" data-cy="TaskCreateUpdateHeading">Create or edit a Task</h2>
        <div>
          <div class="form-group" v-if="task.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="task.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="task-topic">Topic</label>
            <input
              type="text"
              class="form-control"
              name="topic"
              id="task-topic"
              data-cy="topic"
              :class="{ valid: !$v.task.topic.$invalid, invalid: $v.task.topic.$invalid }"
              v-model="$v.task.topic.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="task-createdAt">Created At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="task-createdAt"
                  v-model="$v.task.createdAt.$model"
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
                id="task-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.task.createdAt.$invalid, invalid: $v.task.createdAt.$invalid }"
                v-model="$v.task.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="task-updatedAt">Updated At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="task-updatedAt"
                  v-model="$v.task.updatedAt.$model"
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
                id="task-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.task.updatedAt.$invalid, invalid: $v.task.updatedAt.$invalid }"
                v-model="$v.task.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="task-deadline">Deadline</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="task-deadline"
                  v-model="$v.task.deadline.$model"
                  name="deadline"
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
                id="task-deadline"
                data-cy="deadline"
                type="text"
                class="form-control"
                name="deadline"
                :class="{ valid: !$v.task.deadline.$invalid, invalid: $v.task.deadline.$invalid }"
                v-model="$v.task.deadline.$model"
              />
            </b-input-group>
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
            :disabled="$v.task.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./task-update.component.ts"></script>
