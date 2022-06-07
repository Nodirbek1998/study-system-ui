<template>
  <div class="page">
    <div class="row h-100">
      <div class="col-6">
        <div v-if="reminder">
          <b-card class='head-card'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='reminder.title'
                 v-html='reminder.title'
               ></span>
              </div>
            </div>
          </b-card>
          <b-card class='head-card'>
            <div class='row'>
              <div class='col-12'>
               <span
                 v-if='reminder.body'
                 v-html='reminder.body'
               ></span>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reminder-details.component.ts">
</script>

<style scoped>

</style>
