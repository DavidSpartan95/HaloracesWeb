<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  padding-top: 100px;
  /* Match or slightly exceed navbar height */
}
</style>
