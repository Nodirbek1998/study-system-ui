<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="subjects">
        <h2 class="jh-entity-heading" data-cy="subjectsDetailsHeading">
          <span v-text="$t('studysystemApp.subjects.detail.title')">Subjects</span> {{ subjects.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.subjects.nameUz')">Name Uz</span>
          </dt>
          <dd>
            <span>{{ subjects.nameUz }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.subjects.nameRu')">Name Ru</span>
          </dt>
          <dd>
            <span>{{ subjects.nameRu }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.subjects.nameEn')">Name En</span>
          </dt>
          <dd>
            <span>{{ subjects.nameEn }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.subjects.createdAt')">Created At</span>
          </dt>
          <dd>
            <span>{{ subjects.createdAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.subjects.updatedAt')">Updated At</span>
          </dt>
          <dd>
            <span>{{ subjects.updatedAt }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="subjects.id" :to="{ name: 'SubjectsEdit', params: { subjectsId: subjects.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./subjects-details.component.ts"></script>
