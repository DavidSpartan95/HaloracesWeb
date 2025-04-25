<template>
  <div class="user-list">
    <div class="sort-controls">
      <label for="sort">Sort by:</label>
      <select v-model="selectedSort" id="sort">
        <option value="name">Name (A-Z)</option>
        <option value="wins">Most Wins</option>
        <option value="losses">Most Losses</option>
        <option value="numRaces">Most Races</option>
      </select>
    </div>

    <ul>
      <li v-for="(user, index) in sortedUsers" :key="index" class="user-item" @click="showModal(user)">
        <div class="user-stats">
          <span class="user-name">{{ user.name }}</span>
          <span>W: {{ user.wins.length }}</span>
          <span>L: {{ user.losses.length }}</span>
          <span>Total: {{ user.numRaces }}</span>
        </div>
      </li>
    </ul>

    <UserStatsModal v-if="isModalVisible" :active="selectedUser" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '../data/users';
import { users } from '../data/users';
import UserStatsModal from './UserStatsModal.vue';

// Reactive properties
const selectedSort = ref('name');
const isModalVisible = ref(false);
const selectedUser = ref<User | null>(null); // Ensure selectedUser is typed correctly as User or null

// Sorted users based on selected sort type
const sortedUsers = computed(() => {
  const sorted = [...users];
  switch (selectedSort.value) {
    case 'wins':
      return sorted.sort((a, b) => b.wins.length - a.wins.length);
    case 'losses':
      return sorted.sort((a, b) => b.losses.length - a.losses.length);
    case 'numRaces':
      return sorted.sort((a, b) => b.numRaces - a.numRaces);
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
});

// Modal control methods
function showModal(user: User) {
  selectedUser.value = user;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
}
</script>

<style scoped>
.user-list {
  padding: 1rem;
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  background-color: #2e2e2e; /* Dark background */
  border-radius: 10px;
  color: #f1f1f1; /* Light text */
}

ul {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #3a3a3a; /* Slightly lighter dark for user item */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.user-item:hover {
  background-color: #4c4c4c; /* Lighter hover effect */
}

.user-name {
  font-weight: bold;
  font-size: 1.0rem;
  color: #f1f1f1;
}

.user-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 evenly spaced columns */
  width: 100%;
  font-size: 1.0rem;
  color: #c4c4c4;
  column-gap: 1rem; /* optional spacing between columns */
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #f1f1f1;
}

.sort-controls select {
  background-color: #3a3a3a;
  color: #f1f1f1;
  border: 1px solid #555;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
}
</style>
