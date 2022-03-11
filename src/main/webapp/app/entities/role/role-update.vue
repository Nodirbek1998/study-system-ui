<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="studysystemApp.role.home.createOrEditLabel"
          data-cy="RoleCreateUpdateHeading"
          v-text="$t('studysystemApp.role.home.createOrEditLabel')"
        >
          Create or edit a Role
        </h2>
        <div>
          <div class="form-group" v-if="role.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="role.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.role.nameUz')" for="role-nameUz">Name Uz</label>
            <input
              type="text"
              class="form-control"
              name="nameUz"
              id="role-nameUz"
              data-cy="nameUz"
              :class="{ valid: !$v.role.nameUz.$invalid, invalid: $v.role.nameUz.$invalid }"
              v-model="$v.role.nameUz.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.role.nameRu')" for="role-nameRu">Name Ru</label>
            <input
              type="text"
              class="form-control"
              name="nameRu"
              id="role-nameRu"
              data-cy="nameRu"
              :class="{ valid: !$v.role.nameRu.$invalid, invalid: $v.role.nameRu.$invalid }"
              v-model="$v.role.nameRu.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('studysystemApp.role.nameEn')" for="role-nameEn">Name En</label>
            <input
              type="text"
              class="form-control"
              name="nameEn"
              id="role-nameEn"
              data-cy="nameEn"
              :class="{ valid: !$v.role.nameEn.$invalid, invalid: $v.role.nameEn.$invalid }"
              v-model="$v.role.nameEn.$model"
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
            :disabled="$v.role.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./role-update.component.ts"></script>
