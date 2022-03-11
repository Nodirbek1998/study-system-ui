<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="testAnswer">
        <h2 class="jh-entity-heading" data-cy="testAnswerDetailsHeading">
          <span v-text="$t('studysystemApp.testAnswer.detail.title')">TestAnswer</span> {{ testAnswer.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.testAnswer.createdAt')">Created At</span>
          </dt>
          <dd>
            <span>{{ testAnswer.createdAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.testAnswer.updatedAt')">Updated At</span>
          </dt>
          <dd>
            <span>{{ testAnswer.updatedAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.testAnswer.right')">Right</span>
          </dt>
          <dd>
            <span>{{ testAnswer.right }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.testAnswer.studyUser')">Study User</span>
          </dt>
          <dd>
            <span v-for="(studyUser, i) in testAnswer.studyUsers" :key="studyUser.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: studyUser.id } }">{{ studyUser.id }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="testAnswer.id"
          :to="{ name: 'TestAnswerEdit', params: { testAnswerId: testAnswer.id } }"
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

<script lang="ts" src="./test-answer-details.component.ts"></script>
