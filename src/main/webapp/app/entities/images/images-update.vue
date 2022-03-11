<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.images.home.createOrEditLabel"
          data-cy="ImagesCreateUpdateHeading"
          v-text="$t('studysystemApp.images.home.createOrEditLabel')"
        >
          Create or edit a Images
        </h2>
        <div>
          <div class="form-group" v-if="images.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="images.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.images.name')" for="images-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="images-name"
              data-cy="name"
              :class="{ valid: !$v.images.name.$invalid, invalid: $v.images.name.$invalid }"
              v-model="$v.images.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.images.imageSize')" for="images-imageSize">Image Size</label>
            <input
              type="number"
              class="form-control"
              name="imageSize"
              id="images-imageSize"
              data-cy="imageSize"
              :class="{ valid: !$v.images.imageSize.$invalid, invalid: $v.images.imageSize.$invalid }"
              v-model.number="$v.images.imageSize.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.images.contentType')" for="images-contentType">Content Type</label>
            <input
              type="text"
              class="form-control"
              name="contentType"
              id="images-contentType"
              data-cy="contentType"
              :class="{ valid: !$v.images.contentType.$invalid, invalid: $v.images.contentType.$invalid }"
              v-model="$v.images.contentType.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.images.createdAt')" for="images-createdAt">Created At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="images-createdAt"
                  v-model="$v.images.createdAt.$model"
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
                id="images-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.images.createdAt.$invalid, invalid: $v.images.createdAt.$invalid }"
                v-model="$v.images.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.images.studyUser')" for="images-studyUser">Study User</label>
            <select class="form-control" id="images-studyUser" data-cy="studyUser" name="studyUser" v-model="images.studyUser">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="images.studyUser && studyUsersOption.id === images.studyUser.id ? images.studyUser : studyUsersOption"
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
            :disabled="$v.images.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./images-update.component.ts"></script>
