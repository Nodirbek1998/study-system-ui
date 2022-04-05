<template>
  <div id="app">
    <router-view></router-view>
    <loader :isShow="syncedIsShow" class="w-100 h-100 loader-full-height"></loader>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
