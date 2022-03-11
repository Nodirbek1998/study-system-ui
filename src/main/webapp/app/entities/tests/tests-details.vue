<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="tests">
        <h2 class="jh-entity-heading" data-cy="testsDetailsHeading"><span>Tests</span> {{ tests.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ tests.name }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ tests.status }}</span>
          </dd>
          <dt>
            <span>Deadline</span>
          </dt>
          <dd>
            <span>{{ tests.deadline }}</span>
          </dd>
          <dt>
            <span>Subject</span>
          </dt>
          <dd>
            <div v-if="tests.subject">
              <router-link :to="{ name: 'SubjectsView', params: { subjectsId: tests.subject.id } }">{{ tests.subject.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="tests.id" :to="{ name: 'TestsEdit', params: { testsId: tests.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./tests-details.component.ts"></script>
