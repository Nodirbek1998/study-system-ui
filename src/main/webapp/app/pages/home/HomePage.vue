<template>
  <div class="page page-home">
    <div class="row">
      <div class="col-9">
        <div class=" pr-2  ml-2">
          <ul class="list-unstyled mb-0">
            <li class="list-unstyled-item " v-for="post in articles" v-bind:key="post.id">
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
              <hr/>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-3">
       <div class="mb-2">
         <calendar-home></calendar-home>
       </div>
       <div class="mt-2">
         <reminder-home></reminder-home>
       </div>
      </div>
<!--      <div class="col-3">-->
<!--        <reminder-home></reminder-home>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
