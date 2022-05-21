<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="studyUsers">
        <h2 class="jh-entity-heading" data-cy="studyUsersDetailsHeading">
          <span v-text="$t('studysystemApp.studyUsers.detail.title')">StudyUsers</span> {{ studyUsers.id }}
        </h2>

        <div>
          <b-card class="head-card">
            <div class="row">
              <div class="col-4">
                <span v-html="$t('studysystemApp.studyUsers.firstName')"></span>
              </div>
              <div class="col-8">
                <span class="font-weight-bold" v-html="studyUsers.firstName"></span>
              </div>
            </div>
          </b-card>
          <b-card class="head-card">
            <div class="row">
              <div class="col-4">
                <span v-html="$t('studysystemApp.studyUsers.age')"></span>
              </div>
              <div class="col-8">
                <span class="font-weight-bold" v-html="studyUsers.age"></span>
              </div>
            </div>
          </b-card>
          <b-card class="head-card">
            <div class="row">
              <div class="col-4">
                <span v-html="$t('studysystemApp.studyUsers.phone')"></span>
              </div>
              <div class="col-8">
                <span class="font-weight-bold" v-html="studyUsers.phone"></span>
              </div>
            </div>
          </b-card>
          <b-card class="head-card">
            <div class="row">
              <div class="col-4">
                <span v-html="$t('studysystemApp.studyUsers.email')"></span>
              </div>
              <div class="col-8">
                <span class="font-weight-bold" v-html="studyUsers.email"></span>
              </div>
            </div>
          </b-card>
          <b-card class="head-card">
            <div class="row">
              <div class="col-4">
                <span v-html="$t('studysystemApp.studyUsers.username')"></span>
              </div>
              <div class="col-8">
                <span class="font-weight-bold" v-html="studyUsers.login"></span>
              </div>
            </div>
          </b-card>
          <b-card class="head-card">
            <div class="row">
              <div class="col-4">
                <span v-html="$t('studysystemApp.studyUsers.password')"></span>
              </div>
              <div class="col-8">
                <span class="font-weight-bold" v-html="studyUsers.password"></span>
              </div>
            </div>
          </b-card>
        </div>
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
