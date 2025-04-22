<template>
  <div class="user-list">
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
import { computed } from 'vue';
import { users } from '../data/users'; // assume this is an array of user objects

const sortedUsers = computed(() => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
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
</style>
