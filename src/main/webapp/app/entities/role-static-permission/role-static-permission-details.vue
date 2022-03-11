<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="roleStaticPermission">
        <h2 class="jh-entity-heading" data-cy="roleStaticPermissionDetailsHeading">
          <span v-text="$t('studysystemApp.roleStaticPermission.detail.title')">RoleStaticPermission</span> {{ roleStaticPermission.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.roleStaticPermission.staticPermission')">Static Permission</span>
          </dt>
          <dd>
            <span v-text="$t('studysystemApp.EnumStaticPermission.' + roleStaticPermission.staticPermission)">{{
              roleStaticPermission.staticPermission
            }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.roleStaticPermission.role')">Role</span>
          </dt>
          <dd>
            <div v-if="roleStaticPermission.role">
              <router-link :to="{ name: 'RoleView', params: { roleId: roleStaticPermission.role.id } }">{{
                roleStaticPermission.role.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="roleStaticPermission.id"
          :to="{ name: 'RoleStaticPermissionEdit', params: { roleStaticPermissionId: roleStaticPermission.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./role-static-permission-details.component.ts"></script>
