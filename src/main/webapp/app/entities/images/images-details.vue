<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="images">
        <h2 class="jh-entity-heading" data-cy="imagesDetailsHeading"><span>Images</span> {{ images.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ images.name }}</span>
          </dd>
          <dt>
            <span>Image Size</span>
          </dt>
          <dd>
            <span>{{ images.imageSize }}</span>
          </dd>
          <dt>
            <span>Content Type</span>
          </dt>
          <dd>
            <span>{{ images.contentType }}</span>
          </dd>
          <dt>
            <span>Created At</span>
          </dt>
          <dd>
            <span>{{ images.createdAt }}</span>
          </dd>
          <dt>
            <span>Study User</span>
          </dt>
          <dd>
            <div v-if="images.studyUser">
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: images.studyUser.id } }">{{
                images.studyUser.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="images.id" :to="{ name: 'ImagesEdit', params: { imagesId: images.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./images-details.component.ts"></script>
