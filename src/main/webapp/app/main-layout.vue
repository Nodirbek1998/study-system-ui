<template>
  <div class="app" v-if="authenticated">
    <!--        <ribbon></ribbon>-->
    <div id="app-header">
      <jhi-navbar></jhi-navbar>
    </div>
    <div class="container-fluid h-100 p-0">
      <div class="d-flex min-h-100">
        <jhi-sidebar/>
        <div class="card jh-card content min-h-100">
          <keep-alive max="2" >
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./main-layout.component.ts">
</script>

<style scoped>

</style>
