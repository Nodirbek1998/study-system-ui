<template>
  <div class="page page-internal">
    <b-row>
      <b-col
        md="4"
        class="pb-5"
        v-for="group in groups"
        :title="group.name"
        :key="group.id"
        v-on:click="openGroup(group.id)"
      >
        <b-card-group deck >
          <b-card>
            <b-card-text >{{group.name}}</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" src="./user-groups.component.ts">
</script>

<style scoped>

</style>
