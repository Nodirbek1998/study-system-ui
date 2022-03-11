<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="testQuestion">
        <h2 class="jh-entity-heading" data-cy="testQuestionDetailsHeading"><span>TestQuestion</span> {{ testQuestion.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ testQuestion.name }}</span>
          </dd>
          <dt>
            <span>Level</span>
          </dt>
          <dd>
            <span>{{ testQuestion.level }}</span>
          </dd>
          <dt>
            <span>Answer A</span>
          </dt>
          <dd>
            <span>{{ testQuestion.answerA }}</span>
          </dd>
          <dt>
            <span>Answer B</span>
          </dt>
          <dd>
            <span>{{ testQuestion.answerB }}</span>
          </dd>
          <dt>
            <span>Answer C</span>
          </dt>
          <dd>
            <span>{{ testQuestion.answerC }}</span>
          </dd>
          <dt>
            <span>Answer D</span>
          </dt>
          <dd>
            <span>{{ testQuestion.answerD }}</span>
          </dd>
          <dt>
            <span>Test</span>
          </dt>
          <dd>
            <div v-if="testQuestion.test">
              <router-link :to="{ name: 'TestsView', params: { testsId: testQuestion.test.id } }">{{ testQuestion.test.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="testQuestion.id"
          :to="{ name: 'TestQuestionEdit', params: { testQuestionId: testQuestion.id } }"
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

<script lang="ts" src="./test-question-details.component.ts"></script>
