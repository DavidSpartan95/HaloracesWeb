<script setup lang="ts">
</script>

<template>
  <div>
    <router-link to="/home">
      <button>Go to UserList</button>
    </router-link>
    <router-link to="/raceResults">
      <button>Go to Results</button>
    </router-link>

    <router-view />
  </div>
</template>

