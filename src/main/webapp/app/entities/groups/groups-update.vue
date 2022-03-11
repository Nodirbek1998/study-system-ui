<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="studysystemApp.groups.home.createOrEditLabel" data-cy="GroupsCreateUpdateHeading">Create or edit a Groups</h2>
        <div>
          <div class="form-group" v-if="groups.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="groups.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="groups-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="groups-name"
              data-cy="name"
              :class="{ valid: !$v.groups.name.$invalid, invalid: $v.groups.name.$invalid }"
              v-model="$v.groups.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="groups-createdAt">Created At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="groups-createdAt"
                  v-model="$v.groups.createdAt.$model"
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
                id="groups-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.groups.createdAt.$invalid, invalid: $v.groups.createdAt.$invalid }"
                v-model="$v.groups.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="groups-updatedAt">Updated At</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="groups-updatedAt"
                  v-model="$v.groups.updatedAt.$model"
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
                id="groups-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.groups.updatedAt.$invalid, invalid: $v.groups.updatedAt.$invalid }"
                v-model="$v.groups.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label for="groups-studyUser">Study User</label>
            <select
              class="form-control"
              id="groups-studyUsers"
              data-cy="studyUser"
              multiple
              name="studyUser"
              v-if="groups.studyUsers !== undefined"
              v-model="groups.studyUsers"
            >
              <option
                v-bind:value="getSelected(groups.studyUsers, studyUsersOption)"
                v-for="studyUsersOption in studyUsers"
                :key="studyUsersOption.id"
              >
                {{ studyUsersOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="groups-subjects">Subjects</label>
            <select
              class="form-control"
              id="groups-subjects"
              data-cy="subjects"
              multiple
              name="subjects"
              v-if="groups.subjects !== undefined"
              v-model="groups.subjects"
            >
              <option
                v-bind:value="getSelected(groups.subjects, subjectsOption)"
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
            :disabled="$v.groups.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./groups-update.component.ts"></script>
