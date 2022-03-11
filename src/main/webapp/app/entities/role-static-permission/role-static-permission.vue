<template>
  <div>
    <h2 id="page-heading" data-cy="RoleStaticPermissionHeading">
      <span v-text="$t('studysystemApp.roleStaticPermission.home.title')" id="role-static-permission-heading">Role Static Permissions</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.roleStaticPermission.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'RoleStaticPermissionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-role-static-permission"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('studysystemApp.roleStaticPermission.home.createLabel')"> Create a new Role Static Permission </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && roleStaticPermissions && roleStaticPermissions.length === 0">
      <span v-text="$t('studysystemApp.roleStaticPermission.home.notFound')">No roleStaticPermissions found</span>
    </div>
    <div class="table-responsive" v-if="roleStaticPermissions && roleStaticPermissions.length > 0">
      <table class="table table-striped" aria-describedby="roleStaticPermissions">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('staticPermission')">
              <span v-text="$t('studysystemApp.roleStaticPermission.staticPermission')">Static Permission</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'staticPermission'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('role.id')">
              <span v-text="$t('studysystemApp.roleStaticPermission.role')">Role</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'role.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="roleStaticPermission in roleStaticPermissions" :key="roleStaticPermission.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RoleStaticPermissionView', params: { roleStaticPermissionId: roleStaticPermission.id } }">{{
                roleStaticPermission.id
              }}</router-link>
            </td>
            <td v-text="$t('studysystemApp.EnumStaticPermission.' + roleStaticPermission.staticPermission)">
              {{ roleStaticPermission.staticPermission }}
            </td>
            <td>
              <div v-if="roleStaticPermission.role">
                <router-link :to="{ name: 'RoleView', params: { roleId: roleStaticPermission.role.id } }">{{
                  roleStaticPermission.role.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'RoleStaticPermissionView', params: { roleStaticPermissionId: roleStaticPermission.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'RoleStaticPermissionEdit', params: { roleStaticPermissionId: roleStaticPermission.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(roleStaticPermission)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="studysystemApp.roleStaticPermission.delete.question"
          data-cy="roleStaticPermissionDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-roleStaticPermission-heading"
          v-text="$t('studysystemApp.roleStaticPermission.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Role Static Permission?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-roleStaticPermission"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeRoleStaticPermission()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="roleStaticPermissions && roleStaticPermissions.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./role-static-permission.component.ts"></script>
