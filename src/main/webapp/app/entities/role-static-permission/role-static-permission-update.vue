<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="studysystemApp.roleStaticPermission.home.createOrEditLabel" data-cy="RoleStaticPermissionCreateUpdateHeading">
          Create or edit a RoleStaticPermission
        </h2>
        <div>
          <div class="form-group" v-if="roleStaticPermission.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="roleStaticPermission.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="role-static-permission-staticPermission">Static Permission</label>
            <select
              class="form-control"
              name="staticPermission"
              :class="{
                valid: !$v.roleStaticPermission.staticPermission.$invalid,
                invalid: $v.roleStaticPermission.staticPermission.$invalid,
              }"
              v-model="$v.roleStaticPermission.staticPermission.$model"
              id="role-static-permission-staticPermission"
              data-cy="staticPermission"
            >
              <option
                v-for="enumStaticPermission in enumStaticPermissionValues"
                :key="enumStaticPermission"
                v-bind:value="enumStaticPermission"
              >
                {{ enumStaticPermission }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="role-static-permission-role">Role</label>
            <select class="form-control" id="role-static-permission-role" data-cy="role" name="role" v-model="roleStaticPermission.role">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  roleStaticPermission.role && roleOption.id === roleStaticPermission.role.id ? roleStaticPermission.role : roleOption
                "
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
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.roleStaticPermission.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./role-static-permission-update.component.ts"></script>
