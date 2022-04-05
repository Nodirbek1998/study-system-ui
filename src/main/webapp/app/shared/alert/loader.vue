<template>
    <div v-if="syncedIsShow">
        <div class="overlay show"></div>
        <div class="spanner show">
            <pulse-loader loading color="#88173d" class="main-loader-pulse"></pulse-loader>
        </div>
    </div>
</template>

<script lang="ts" src="./loader.component.ts">
</script>

<style scoped>

</style>
