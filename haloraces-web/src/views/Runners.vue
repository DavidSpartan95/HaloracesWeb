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

      <div class="title">
        <span class="tittle-runner">RUNNER</span>
        <span class="title-text">WINS</span>
        <span class="title-text">LOSSES</span>
        <span class="title-text">TOTAL RACES</span>
      </div>


      <li v-for="(user, index) in sortedUsers" :key="index"
        :class="['user-item', index % 2 === 0 ? 'bg-blue' : 'bg-black']">
        <div class="user-stats">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-stat">{{ user.wins }}</span>
          <span class="user-stat">{{ user.losses }}</span>
          <span class="user-stat">{{ user.numRaces }}</span>
        </div>
      </li>


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
.bg-blue {
  background: #0F1832;
}

.bg-black {
  background: #131313;
}

.inner-padding {
  padding: 1rem;
}

.user-list {

  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid rgba(161, 161, 161, 0.50);
  background: #0F1832;
}

.title {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* 4 evenly spaced columns */
  width: 100%;
  font-size: 1.0rem;

  column-gap: 1rem;

  padding-bottom: 1rem;
  padding-top: 32px;
}

.tittle-runner {
  font-weight: bold;
  font-size: 1.0rem;
  color: #f1f1f1;
  text-align: left;
  padding-left: 1rem;
}

.title-text {
  font-weight: bold;
  font-size: 1.0rem;
  color: #f1f1f1;
  text-align: center;
}

.user-item {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 1rem;
  padding-top: 1rem;

}

.user-item:hover {
  background-color: #001f4d;
}

.user-name {
  font-weight: bold;
  font-size: 1.0rem;
  color: #E08916;
  text-align: left;
  padding-left: 1rem;
}

.user-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* 4 evenly spaced columns */
  width: 100%;
  font-size: 1.0rem;
  color: #c4c4c4;
  column-gap: 1rem;
  text-align: center;
}

.user-stat {
  font-weight: bold;
}

.user-game-count {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #a8a8a8;

}

.game-count {
  margin-right: 1rem;
}

.sort {
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
