<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.studyLogs.home.createOrEditLabel"
          data-cy="StudyLogsCreateUpdateHeading"
          v-text="$t('studysystemApp.studyLogs.home.createOrEditLabel')"
        >
          Create or edit a StudyLogs
        </h2>
        <div>
          <div class="form-group" v-if="studyLogs.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="studyLogs.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyLogs.operationName')" for="study-logs-operationName"
              >Operation Name</label
            >
            <input
              type="text"
              class="form-control"
              name="operationName"
              id="study-logs-operationName"
              data-cy="operationName"
              :class="{ valid: !$v.studyLogs.operationName.$invalid, invalid: $v.studyLogs.operationName.$invalid }"
              v-model="$v.studyLogs.operationName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyLogs.clientIp')" for="study-logs-clientIp">Client Ip</label>
            <input
              type="text"
              class="form-control"
              name="clientIp"
              id="study-logs-clientIp"
              data-cy="clientIp"
              :class="{ valid: !$v.studyLogs.clientIp.$invalid, invalid: $v.studyLogs.clientIp.$invalid }"
              v-model="$v.studyLogs.clientIp.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyLogs.host')" for="study-logs-host">Host</label>
            <input
              type="text"
              class="form-control"
              name="host"
              id="study-logs-host"
              data-cy="host"
              :class="{ valid: !$v.studyLogs.host.$invalid, invalid: $v.studyLogs.host.$invalid }"
              v-model="$v.studyLogs.host.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyLogs.createdAt')" for="study-logs-createdAt"
              >Created At</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="study-logs-createdAt"
                  v-model="$v.studyLogs.createdAt.$model"
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
                id="study-logs-createdAt"
                data-cy="createdAt"
                type="text"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.studyLogs.createdAt.$invalid, invalid: $v.studyLogs.createdAt.$invalid }"
                v-model="$v.studyLogs.createdAt.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyLogs.actionType')" for="study-logs-actionType"
              >Action Type</label
            >
            <select
              class="form-control"
              name="actionType"
              :class="{ valid: !$v.studyLogs.actionType.$invalid, invalid: $v.studyLogs.actionType.$invalid }"
              v-model="$v.studyLogs.actionType.$model"
              id="study-logs-actionType"
              data-cy="actionType"
            >
              <option
                v-for="enumActionType in enumActionTypeValues"
                :key="enumActionType"
                v-bind:value="enumActionType"
                v-bind:label="$t('studysystemApp.EnumActionType.' + enumActionType)"
              >
                {{ enumActionType }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.studyLogs.studyUser')" for="study-logs-studyUser"
              >Study User</label
            >
            <select class="form-control" id="study-logs-studyUser" data-cy="studyUser" name="studyUser" v-model="studyLogs.studyUser">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  studyLogs.studyUser && studyUsersOption.id === studyLogs.studyUser.id ? studyLogs.studyUser : studyUsersOption
                "
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
            :disabled="$v.studyLogs.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./study-logs-update.component.ts"></script>
