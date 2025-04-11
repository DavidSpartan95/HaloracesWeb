<template>
  <div class="user-list">
    <ul>
      <li v-for="(user, index) in sortedUsers" :key="index" class="user-item">
        <span class="user-name">{{ user.name }}</span>
        <span class="user-wins">Wins: ???</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { users } from '../data/users'; // assume this is an array of user objects

const sortedUsers = computed(() => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
.user-list {
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background-color: #0fbe2c;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: background-color 0.2s ease;
}

.user-item:hover {
  background-color: #e0e7ff;
}

.user-name {
  font-weight: bold;
}

.user-wins {
  color: #555;
}
</style>
