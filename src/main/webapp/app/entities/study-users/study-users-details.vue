<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="studyUsers">
        <h2 class="jh-entity-heading" data-cy="studyUsersDetailsHeading">
          <span v-text="$t('studysystemApp.studyUsers.detail.title')">StudyUsers</span> {{ studyUsers.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.studyUsers.fullName')">Full Name</span>
          </dt>
          <dd>
            <span>{{ studyUsers.fullName }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.studyUsers.age')">Age</span>
          </dt>
          <dd>
            <span>{{ studyUsers.age }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.studyUsers.phone')">Phone</span>
          </dt>
          <dd>
            <span>{{ studyUsers.phone }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.studyUsers.email')">Email</span>
          </dt>
          <dd>
            <span>{{ studyUsers.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.studyUsers.username')">Username</span>
          </dt>
          <dd>
            <span>{{ studyUsers.username }}</span>
          </dd>
<!--          <dt>-->
<!--            <span v-text="$t('studysystemApp.studyUsers.password')">Password</span>-->
<!--          </dt>-->
<!--          <dd>-->
<!--            <span>{{ studyUsers.password }}</span>-->
<!--          </dd>-->
<!--          <dt>-->
<!--            <span v-text="$t('studysystemApp.studyUsers.createdAt')">Created At</span>-->
<!--          </dt>-->
<!--          <dd>-->
<!--            <span>{{ studyUsers.createdAt }}</span>-->
<!--          </dd>-->
<!--          <dt>-->
<!--            <span v-text="$t('studysystemApp.studyUsers.updatedAt')">Updated At</span>-->
<!--          </dt>-->
<!--          <dd>-->
<!--            <span>{{ studyUsers.updatedAt }}</span>-->
<!--          </dd>-->
          <dt>
            <span v-text="$t('studysystemApp.studyUsers.role')">Role</span>
          </dt>
          <dd>
            <div v-if="studyUsers.role">
              <router-link :to="{ name: 'RoleView', params: { roleId: studyUsers.role.id } }">{{ studyUsers.role.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="studyUsers.id"
          :to="{ name: 'StudyUsersEdit', params: { studyUsersId: studyUsers.id } }"
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

<script lang="ts" src="./study-users-details.component.ts"></script>
