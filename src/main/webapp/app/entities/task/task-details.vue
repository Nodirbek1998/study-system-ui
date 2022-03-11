<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="task">
        <h2 class="jh-entity-heading" data-cy="taskDetailsHeading">
          <span v-text="$t('studysystemApp.task.detail.title')">Task</span> {{ task.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.task.topic')">Topic</span>
          </dt>
          <dd>
            <span>{{ task.topic }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.task.createdAt')">Created At</span>
          </dt>
          <dd>
            <span>{{ task.createdAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.task.updatedAt')">Updated At</span>
          </dt>
          <dd>
            <span>{{ task.updatedAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.task.deadline')">Deadline</span>
          </dt>
          <dd>
            <span>{{ task.deadline }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="task.id" :to="{ name: 'TaskEdit', params: { taskId: task.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./task-details.component.ts"></script>
