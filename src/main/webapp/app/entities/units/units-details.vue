<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="units">
        <h2 class="jh-entity-heading" data-cy="unitsDetailsHeading"><span>Units</span> {{ units.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name Uz</span>
          </dt>
          <dd>
            <span>{{ units.nameUz }}</span>
          </dd>
          <dt>
            <span>Name Ru</span>
          </dt>
          <dd>
            <span>{{ units.nameRu }}</span>
          </dd>
          <dt>
            <span>Name En</span>
          </dt>
          <dd>
            <span>{{ units.nameEn }}</span>
          </dd>
          <dt>
            <span>Created At</span>
          </dt>
          <dd>
            <span>{{ units.createdAt }}</span>
          </dd>
          <dt>
            <span>Updated At</span>
          </dt>
          <dd>
            <span>{{ units.updatedAt }}</span>
          </dd>
          <dt>
            <span>Subject</span>
          </dt>
          <dd>
            <div v-if="units.subject">
              <router-link :to="{ name: 'SubjectsView', params: { subjectsId: units.subject.id } }">{{ units.subject.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="units.id" :to="{ name: 'UnitsEdit', params: { unitsId: units.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./units-details.component.ts"></script>
