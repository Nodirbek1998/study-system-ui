<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="groups">
        <h2 class="jh-entity-heading" data-cy="groupsDetailsHeading"><span>Groups</span> {{ groups.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ groups.name }}</span>
          </dd>
          <dt>
            <span>Created At</span>
          </dt>
          <dd>
            <span>{{ groups.createdAt }}</span>
          </dd>
          <dt>
            <span>Updated At</span>
          </dt>
          <dd>
            <span>{{ groups.updatedAt }}</span>
          </dd>
          <dt>
            <span>Study User</span>
          </dt>
          <dd>
            <span v-for="(studyUser, i) in groups.studyUsers" :key="studyUser.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: studyUser.id } }">{{ studyUser.id }}</router-link>
            </span>
          </dd>
          <dt>
            <span>Subjects</span>
          </dt>
          <dd>
            <span v-for="(subjects, i) in groups.subjects" :key="subjects.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'SubjectsView', params: { subjectsId: subjects.id } }">{{ subjects.id }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="groups.id" :to="{ name: 'GroupsEdit', params: { groupsId: groups.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./groups-details.component.ts"></script>
