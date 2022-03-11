<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="role">
        <h2 class="jh-entity-heading" data-cy="roleDetailsHeading"><span>Role</span> {{ role.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name Uz</span>
          </dt>
          <dd>
            <span>{{ role.nameUz }}</span>
          </dd>
          <dt>
            <span>Name Ru</span>
          </dt>
          <dd>
            <span>{{ role.nameRu }}</span>
          </dd>
          <dt>
            <span>Name En</span>
          </dt>
          <dd>
            <span>{{ role.nameEn }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="role.id" :to="{ name: 'RoleEdit', params: { roleId: role.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./role-details.component.ts"></script>
