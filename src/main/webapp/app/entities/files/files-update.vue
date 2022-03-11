<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="studysystemApp.files.home.createOrEditLabel" data-cy="FilesCreateUpdateHeading">Create or edit a Files</h2>
        <div>
          <div class="form-group" v-if="files.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="files.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="files-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="files-name"
              data-cy="name"
              :class="{ valid: !$v.files.name.$invalid, invalid: $v.files.name.$invalid }"
              v-model="$v.files.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="files-fileSize">File Size</label>
            <input
              type="number"
              class="form-control"
              name="fileSize"
              id="files-fileSize"
              data-cy="fileSize"
              :class="{ valid: !$v.files.fileSize.$invalid, invalid: $v.files.fileSize.$invalid }"
              v-model.number="$v.files.fileSize.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="files-contentType">Content Type</label>
            <input
              type="text"
              class="form-control"
              name="contentType"
              id="files-contentType"
              data-cy="contentType"
              :class="{ valid: !$v.files.contentType.$invalid, invalid: $v.files.contentType.$invalid }"
              v-model="$v.files.contentType.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="files-createdAt">Created At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="files-createdAt"
                  v-model="$v.files.createdAt.$model"
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
                id="files-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.files.createdAt.$invalid, invalid: $v.files.createdAt.$invalid }"
                v-model="$v.files.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="files-createdBy">Created By</label>
            <select class="form-control" id="files-createdBy" data-cy="createdBy" name="createdBy" v-model="files.createdBy">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="files.createdBy && studyUsersOption.id === files.createdBy.id ? files.createdBy : studyUsersOption"
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
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.files.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./files-update.component.ts"></script>
