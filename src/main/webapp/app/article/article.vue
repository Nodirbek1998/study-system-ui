<template>
  <div class="page">
    <h2 id="page-heading" data-cy="ArticleHeading">
      <span v-text="$t('studysystemApp.article.home.title')" id="article-heading">Articles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('studysystemApp.examples.home.refreshListLabel')">Refresh List</span>
        </button>
        <button class="btn btn-info mr-2" v-on:click="createExamples" v-if="!$can('ExamplesAdd', 'admin')">
          <font-awesome-icon icon="plus" ></font-awesome-icon>
          <span v-text="$t('studysystemApp.examples.home.createLabel')">Create Examples</span>
        </button>
      </div>
    </h2>
    <div class="row h-100" v-if="articles">
      <div class="col-6" v-for="post in articles">
        <b-media right-align vertical-align="center">
          <template v-slot:aside>
            <img  :src="$imageUrl(post.imagesId)" alt="placeholder1" style="width: 200px"/>
          </template>
          <div class="post-info">
            <h6 class="post-title ff-roboto_bold mt-0 mb-2">{{ post.name }}</h6>
            <p class="post-description mb-0">{{ post.text }}</p>
            <ul class="list-inline mt-1 mb-0">
              <li class="list-inline-item pub-date">
                <span>{{ post.createdAt }} </span>
              </li>
              <li class="list-inline-item read-more float-right">
                <b-link class="ff-roboto_bold font-weight-bold"
                        :to="{name: 'ArticleView', params: {articleId: post.id}}">
                  {{$t('studysystemApp.article.home.readMore')}}
                </b-link>
              </li>
            </ul>
          </div>
        </b-media>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./article.component.ts">
</script>

<style scoped>

</style>
