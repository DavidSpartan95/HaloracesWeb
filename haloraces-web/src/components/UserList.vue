<template>
  <ul>
    <li v-for="(user, index) in sortedUsers" :key="index">
      {{ user.name }} - Wins: ???
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { users } from '../data/users'; // assume this is an array of user objects

const sortedUsers = computed(() => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
});
</script>
