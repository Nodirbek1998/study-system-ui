<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.groups.home.createOrEditLabel"
          data-cy="GroupsCreateUpdateHeading"
          v-text="$t('studysystemApp.groups.home.createOrEditLabel')"
        >
          Create or edit a Groups
        </h2>
        <div>
          <div class="form-group" v-if="groups.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="groups.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.groups.name')" for="groups-name">Name</label>
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
        </div>
        <open-user-select
          :is-show="isShowUserModal"
          @hideUserModel="hideUserModal"
          @selectedUserFromModal="selectedUserFromModal"
          :title="userSelectModalTitle"
          :user-type="currentUserType"
          :selectedUsers="modalSelectedUsers"
        ></open-user-select>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.groups.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./groups-update.component.ts"></script>
