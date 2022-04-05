<template>
  <div class="page page-internal">
    <div class="col">
      <div>
        <b-card-group deck>
          <b-card
            class="col-6"
            v-for="article in articles"
            :title="article.name"
            :key="article.id"
          >
            <b-card-text >{{article.text}}</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts">
export default {
  name: "HomePage",
  components: {

  }
};
</script>
