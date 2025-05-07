<template>
  <div>
    <div class="sort">
      <div class="sort-controls">
        <label for="sort" class="sort-text">Sort by:</label>
        <select v-model="selectedSort" id="sort">
          <option value="name">Name (A-Z)</option>
          <option value="wins">Most Wins</option>
          <option value="losses">Most Losses</option>
          <option value="numRaces">Most Races</option>
        </select>
      </div>
    </div>


    <div class="user-list">
      <ul>
        <li v-for="(user, index) in sortedUsers" :key="index" class="user-item">
          <div class="user-stats">
            <span class="user-name">{{ user.name }}</span>
            <span>W: {{ user.wins }}</span>
            <span>L: {{ user.losses }}</span>
            <span>Total: {{ user.numRaces }}</span>

          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { users } from '../data/users';

const selectedSort = ref('wins');

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
  border-radius: 20px;
  border: 1px solid rgba(161, 161, 161, 0.50);
  background: #0F1832;
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
  background-color: #3a3a3a;
  /* Slightly lighter dark for user item */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.user-item:hover {
  background-color: #4c4c4c;
  /* Lighter hover effect */
}

.user-name {
  font-weight: bold;
  font-size: 1.0rem;
  color: #f1f1f1;
}

.user-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* 4 evenly spaced columns */
  width: 100%;
  font-size: 1.0rem;
  color: #c4c4c4;
  column-gap: 1rem;
  /* optional spacing between columns */
}

.user-game-count {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #a8a8a8;
  /* Slightly darker gray for game count */
}

.game-count {
  margin-right: 1rem;
}

.sort {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 32px;
  display: flex;
  justify-content: flex-end;
  /* aligns content to the right */
  align-items: center;
  /* centers content vertically */
  height: 60px;
  /* optional: gives it a height to center within */
}

.sort-text {
  color: #FCFCFC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #f1f1f1;
}

.sort-controls select {
  appearance: none;
  /* Remove default arrow */
  -webkit-appearance: none;
  -moz-appearance: none;

  background-color: #E08916;
  color: #ffffff;
  padding: 12px 20px 12px 20px;
  /* extra right padding for arrow space */
  border-radius: 12px;
  border: none;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,0 10,0 5,6' fill='white'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 8px;
}
</style>
