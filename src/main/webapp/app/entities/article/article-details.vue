<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="article">
        <h2 class="jh-entity-heading" data-cy="articleDetailsHeading">
          <span v-text="$t('studysystemApp.article.detail.title')">Article</span> {{ article.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('studysystemApp.article.name')">Name</span>
          </dt>
          <dd>
            <span>{{ article.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.article.text')">Text</span>
          </dt>
          <dd>
            <span>{{ article.text }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.article.createdAt')">Created At</span>
          </dt>
          <dd>
            <span>{{ article.createdAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.article.updatedAt')">Updated At</span>
          </dt>
          <dd>
            <span>{{ article.updatedAt }}</span>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.article.studyUser')">Study User</span>
          </dt>
          <dd>
            <div v-if="article.studyUser">
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: article.studyUser.id } }">{{
                article.studyUser.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.article.createdBy')">Created By</span>
          </dt>
          <dd>
            <div v-if="article.createdBy">
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: article.createdBy.id } }">{{
                article.createdBy.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('studysystemApp.article.updatedBy')">Updated By</span>
          </dt>
          <dd>
            <div v-if="article.updatedBy">
              <router-link :to="{ name: 'StudyUsersView', params: { studyUsersId: article.updatedBy.id } }">{{
                article.updatedBy.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="article.id" :to="{ name: 'ArticleEdit', params: { articleId: article.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./article-details.component.ts"></script>
