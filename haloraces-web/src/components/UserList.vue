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
      <li v-for="(user, index) in sortedUsers" :key="index" class="user-item">
        <div class="user-stats">
          <span class="user-name">{{ user.name }}</span>
          <span>W: {{ user.wins }}</span>
          <span>L: {{ user.losses }}</span>
          <span>Total: {{ user.numRaces }}</span>
         <!-- <span class="user-first-race">First Race: {{ user.firstRelayRace.toLocaleDateString() }}</span> -->
        </div>
        <!--
        <div class="user-game-count">
          <span v-for="(count, game) in user.gameCount" :key="game" class="game-count">
            {{ game }}: {{ count }} games
          </span>
        </div>
        -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { users } from '../data/users';

const selectedSort = ref('name');

const sortedUsers = computed(() => {
  const sorted = [...users];
  switch (selectedSort.value) {
    case 'wins':
      return sorted.sort((a, b) => b.wins - a.wins);
    case 'losses':
      return sorted.sort((a, b) => b.losses - a.losses);
    case 'numRaces':
      return sorted.sort((a, b) => b.numRaces - a.numRaces);
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
});

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

.user-game-count {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #a8a8a8; /* Slightly darker gray for game count */
}

.game-count {
  margin-right: 1rem;
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
