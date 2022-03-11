<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.tests.home.createOrEditLabel"
          data-cy="TestsCreateUpdateHeading"
          v-text="$t('studysystemApp.tests.home.createOrEditLabel')"
        >
          Create or edit a Tests
        </h2>
        <div>
          <div class="form-group" v-if="tests.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="tests.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.tests.name')" for="tests-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="tests-name"
              data-cy="name"
              :class="{ valid: !$v.tests.name.$invalid, invalid: $v.tests.name.$invalid }"
              v-model="$v.tests.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.tests.status')" for="tests-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.tests.status.$invalid, invalid: $v.tests.status.$invalid }"
              v-model="$v.tests.status.$model"
              id="tests-status"
              data-cy="status"
            >
              <option
                v-for="enumTest in enumTestValues"
                :key="enumTest"
                v-bind:value="enumTest"
                v-bind:label="$t('studysystemApp.EnumTest.' + enumTest)"
              >
                {{ enumTest }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.tests.deadline')" for="tests-deadline">Deadline</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="tests-deadline"
                  v-model="$v.tests.deadline.$model"
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
                id="tests-deadline"
                data-cy="deadline"
                type="text"
                class="form-control"
                name="deadline"
                :class="{ valid: !$v.tests.deadline.$invalid, invalid: $v.tests.deadline.$invalid }"
                v-model="$v.tests.deadline.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.tests.subject')" for="tests-subject">Subject</label>
            <select class="form-control" id="tests-subject" data-cy="subject" name="subject" v-model="tests.subject">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="tests.subject && subjectsOption.id === tests.subject.id ? tests.subject : subjectsOption"
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
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.tests.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./tests-update.component.ts"></script>
