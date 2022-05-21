<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.subjects.home.createOrEditLabel"
          data-cy="SubjectsCreateUpdateHeading"
          v-text="$t('studysystemApp.subjects.home.createOrEditLabel')"
        >
          Create or edit a Subjects
        </h2>
        <div>
          <div class="form-group" v-if="subjects.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="subjects.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.subjects.nameUz')" for="subjects-nameUz">Name Uz</label>
            <input
              type="text"
              class="form-control"
              name="nameUz"
              id="subjects-nameUz"
              data-cy="nameUz"
              :class="{ valid: !$v.subjects.nameUz.$invalid, invalid: $v.subjects.nameUz.$invalid }"
              v-model="$v.subjects.nameUz.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.subjects.nameRu')" for="subjects-nameRu">Name Ru</label>
            <input
              type="text"
              class="form-control"
              name="nameRu"
              id="subjects-nameRu"
              data-cy="nameRu"
              :class="{ valid: !$v.subjects.nameRu.$invalid, invalid: $v.subjects.nameRu.$invalid }"
              v-model="$v.subjects.nameRu.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.subjects.nameEn')" for="subjects-nameEn">Name En</label>
            <input
              type="text"
              class="form-control"
              name="nameEn"
              id="subjects-nameEn"
              data-cy="nameEn"
              :class="{ valid: !$v.subjects.nameEn.$invalid, invalid: $v.subjects.nameEn.$invalid }"
              v-model="$v.subjects.nameEn.$model"
            />
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
            :disabled="$v.subjects.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./subjects-update.component.ts"></script>
