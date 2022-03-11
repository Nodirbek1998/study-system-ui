<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="studyLogs">
        <h2 class="jh-entity-heading" data-cy="studyLogsDetailsHeading"><span>StudyLogs</span> {{ studyLogs.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Operation Name</span>
          </dt>
          <dd>
            <span>{{ studyLogs.operationName }}</span>
          </dd>
          <dt>
            <span>Client Ip</span>
          </dt>
          <dd>
            <span>{{ studyLogs.clientIp }}</span>
          </dd>
          <dt>
            <span>Host</span>
          </dt>
          <dd>
            <span>{{ studyLogs.host }}</span>
          </dd>
          <dt>
            <span>Created At</span>
          </dt>
          <dd>
            <span>{{ studyLogs.createdAt }}</span>
          </dd>
          <dt>
            <span>Action Type</span>
          </dt>
          <dd>
            <span>{{ studyLogs.actionType }}</span>
          </dd>
          <dt>
            <span>Study User</span>
          </dt>
          <dd>
            <div v-if="studyLogs.studyUser">
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: studyLogs.studyUser.id } }">{{
                studyLogs.studyUser.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="studyLogs.id"
          :to="{ name: 'StudyLogsEdit', params: { studyLogsId: studyLogs.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./study-logs-details.component.ts"></script>
