<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.article.home.createOrEditLabel"
          data-cy="ArticleCreateUpdateHeading"
          v-text="$t('studysystemApp.article.home.createOrEditLabel')"
        >
          Create or edit a Article
        </h2>
        <div>
          <div class="form-group" v-if="article.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="article.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.name')" for="article-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="article-name"
              data-cy="name"
              :class="{ valid: !$v.article.name.$invalid, invalid: $v.article.name.$invalid }"
              v-model="$v.article.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.text')" for="article-text">Text</label>
            <input
              type="text"
              class="form-control"
              name="text"
              id="article-text"
              data-cy="text"
              :class="{ valid: !$v.article.text.$invalid, invalid: $v.article.text.$invalid }"
              v-model="$v.article.text.$model"
            />
            <div v-if="$v.article.text.$anyDirty && $v.article.text.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.article.text.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 1000 })"
              >
                This field cannot be longer than 1000 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.createdAt')" for="article-createdAt">Created At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="article-createdAt"
                  v-model="$v.article.createdAt.$model"
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
                id="article-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.article.createdAt.$invalid, invalid: $v.article.createdAt.$invalid }"
                v-model="$v.article.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.updatedAt')" for="article-updatedAt">Updated At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="article-updatedAt"
                  v-model="$v.article.updatedAt.$model"
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
                id="article-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.article.updatedAt.$invalid, invalid: $v.article.updatedAt.$invalid }"
                v-model="$v.article.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.studyUser')" for="article-studyUser">Study User</label>
            <select class="form-control" id="article-studyUser" data-cy="studyUser" name="studyUser" v-model="article.studyUser">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="article.studyUser && studyUsersOption.id === article.studyUser.id ? article.studyUser : studyUsersOption"
                v-for="studyUsersOption in studyUsers"
                :key="studyUsersOption.id"
              >
                {{ studyUsersOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.createdBy')" for="article-createdBy">Created By</label>
            <select class="form-control" id="article-createdBy" data-cy="createdBy" name="createdBy" v-model="article.createdBy">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="article.createdBy && studyUsersOption.id === article.createdBy.id ? article.createdBy : studyUsersOption"
                v-for="studyUsersOption in studyUsers"
                :key="studyUsersOption.id"
              >
                {{ studyUsersOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.article.updatedBy')" for="article-updatedBy">Updated By</label>
            <select class="form-control" id="article-updatedBy" data-cy="updatedBy" name="updatedBy" v-model="article.updatedBy">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="article.updatedBy && studyUsersOption.id === article.updatedBy.id ? article.updatedBy : studyUsersOption"
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
            :disabled="$v.article.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./article-update.component.ts"></script>
