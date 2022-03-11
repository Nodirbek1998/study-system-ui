<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="images">
        <h2 class="jh-entity-heading" data-cy="imagesDetailsHeading">
          <span v-text="$t('studysystemApp.images.detail.title')">Images</span> {{ images.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.images.name')">Name</span>
          </dt>
          <dd>
            <span>{{ images.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.images.imageSize')">Image Size</span>
          </dt>
          <dd>
            <span>{{ images.imageSize }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.images.contentType')">Content Type</span>
          </dt>
          <dd>
            <span>{{ images.contentType }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.images.createdAt')">Created At</span>
          </dt>
          <dd>
            <span>{{ images.createdAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.images.studyUser')">Study User</span>
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
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="images.id" :to="{ name: 'ImagesEdit', params: { imagesId: images.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./images-details.component.ts"></script>
