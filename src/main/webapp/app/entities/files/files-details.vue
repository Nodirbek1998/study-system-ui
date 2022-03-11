<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="files">
        <h2 class="jh-entity-heading" data-cy="filesDetailsHeading"><span>Files</span> {{ files.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ files.name }}</span>
          </dd>
          <dt>
            <span>File Size</span>
          </dt>
          <dd>
            <span>{{ files.fileSize }}</span>
          </dd>
          <dt>
            <span>Content Type</span>
          </dt>
          <dd>
            <span>{{ files.contentType }}</span>
          </dd>
          <dt>
            <span>Created At</span>
          </dt>
          <dd>
            <span>{{ files.createdAt }}</span>
          </dd>
          <dt>
            <span>Created By</span>
          </dt>
          <dd>
            <div v-if="files.createdBy">
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: files.createdBy.id } }">{{
                files.createdBy.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="files.id" :to="{ name: 'FilesEdit', params: { filesId: files.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./files-details.component.ts"></script>
