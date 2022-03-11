<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="studysystemApp.units.home.createOrEditLabel" data-cy="UnitsCreateUpdateHeading">Create or edit a Units</h2>
        <div>
          <div class="form-group" v-if="units.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="units.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="units-nameUz">Name Uz</label>
            <input
              type="text"
              class="form-control"
              name="nameUz"
              id="units-nameUz"
              data-cy="nameUz"
              :class="{ valid: !$v.units.nameUz.$invalid, invalid: $v.units.nameUz.$invalid }"
              v-model="$v.units.nameUz.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="units-nameRu">Name Ru</label>
            <input
              type="text"
              class="form-control"
              name="nameRu"
              id="units-nameRu"
              data-cy="nameRu"
              :class="{ valid: !$v.units.nameRu.$invalid, invalid: $v.units.nameRu.$invalid }"
              v-model="$v.units.nameRu.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="units-nameEn">Name En</label>
            <input
              type="text"
              class="form-control"
              name="nameEn"
              id="units-nameEn"
              data-cy="nameEn"
              :class="{ valid: !$v.units.nameEn.$invalid, invalid: $v.units.nameEn.$invalid }"
              v-model="$v.units.nameEn.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="units-createdAt">Created At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="units-createdAt"
                  v-model="$v.units.createdAt.$model"
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
                id="units-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.units.createdAt.$invalid, invalid: $v.units.createdAt.$invalid }"
                v-model="$v.units.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="units-updatedAt">Updated At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="units-updatedAt"
                  v-model="$v.units.updatedAt.$model"
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
                id="units-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.units.updatedAt.$invalid, invalid: $v.units.updatedAt.$invalid }"
                v-model="$v.units.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="units-subject">Subject</label>
            <select class="form-control" id="units-subject" data-cy="subject" name="subject" v-model="units.subject">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="units.subject && subjectsOption.id === units.subject.id ? units.subject : subjectsOption"
                v-for="subjectsOption in subjects"
                :key="subjectsOption.id"
              >
                {{ subjectsOption.id }}
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
            :disabled="$v.units.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./units-update.component.ts"></script>
