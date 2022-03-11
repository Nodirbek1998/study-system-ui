<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.studyUsers.home.createOrEditLabel"
          data-cy="StudyUsersCreateUpdateHeading"
          v-text="$t('studysystemApp.studyUsers.home.createOrEditLabel')"
        >
          Create or edit a StudyUsers
        </h2>
        <div>
          <div class="form-group" v-if="studyUsers.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="studyUsers.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.fullName')" for="study-users-fullName">Full Name</label>
            <input
              type="text"
              class="form-control"
              name="fullName"
              id="study-users-fullName"
              data-cy="fullName"
              :class="{ valid: !$v.studyUsers.fullName.$invalid, invalid: $v.studyUsers.fullName.$invalid }"
              v-model="$v.studyUsers.fullName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.age')" for="study-users-age">Age</label>
            <input
              type="number"
              class="form-control"
              name="age"
              id="study-users-age"
              data-cy="age"
              :class="{ valid: !$v.studyUsers.age.$invalid, invalid: $v.studyUsers.age.$invalid }"
              v-model.number="$v.studyUsers.age.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.phone')" for="study-users-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="study-users-phone"
              data-cy="phone"
              :class="{ valid: !$v.studyUsers.phone.$invalid, invalid: $v.studyUsers.phone.$invalid }"
              v-model="$v.studyUsers.phone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.email')" for="study-users-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="study-users-email"
              data-cy="email"
              :class="{ valid: !$v.studyUsers.email.$invalid, invalid: $v.studyUsers.email.$invalid }"
              v-model="$v.studyUsers.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.username')" for="study-users-username">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              id="study-users-username"
              data-cy="username"
              :class="{ valid: !$v.studyUsers.username.$invalid, invalid: $v.studyUsers.username.$invalid }"
              v-model="$v.studyUsers.username.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.password')" for="study-users-password">Password</label>
            <input
              type="text"
              class="form-control"
              name="password"
              id="study-users-password"
              data-cy="password"
              :class="{ valid: !$v.studyUsers.password.$invalid, invalid: $v.studyUsers.password.$invalid }"
              v-model="$v.studyUsers.password.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.createdAt')" for="study-users-createdAt"
              >Created At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="study-users-createdAt"
                  v-model="$v.studyUsers.createdAt.$model"
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
                id="study-users-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.studyUsers.createdAt.$invalid, invalid: $v.studyUsers.createdAt.$invalid }"
                v-model="$v.studyUsers.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.updatedAt')" for="study-users-updatedAt"
              >Updated At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="study-users-updatedAt"
                  v-model="$v.studyUsers.updatedAt.$model"
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
                id="study-users-updatedAt"
                data-cy="updatedAt"
                type="text"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.studyUsers.updatedAt.$invalid, invalid: $v.studyUsers.updatedAt.$invalid }"
                v-model="$v.studyUsers.updatedAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyUsers.role')" for="study-users-role">Role</label>
            <select class="form-control" id="study-users-role" data-cy="role" name="role" v-model="studyUsers.role">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="studyUsers.role && roleOption.id === studyUsers.role.id ? studyUsers.role : roleOption"
                v-for="roleOption in roles"
                :key="roleOption.id"
              >
                {{ roleOption.id }}
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
            :disabled="$v.studyUsers.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./study-users-update.component.ts"></script>
