<template>
    <div v-if="user" class="service-record">
      <h3>{{ user?.name }}</h3>
  
      <div class="stat-boxes">
        <div class="stat-box">
          <div>
            <h2>Service Record</h2>
            <p v-for="(count, game) in user.gameCount" :key="game">
              {{ game }}: {{ count }}
            </p>
            <p>Races: {{ user.numRaces.length }}</p>
            <p>Wins: {{ user.wins.length }}</p>
            <p>Losses: {{ user.losses.length }}</p>
            <p>First Relay Race: {{ user.firstRelayRace.toDateString() }}</p>
          </div>
        </div>
        <div class="stat-box">
          <h2>wins</h2>
          <p v-for="(game, index) in user.wins" :key="index">
            {{ game.year }} {{ game.difficulty }}
          </p>
        </div>
        <div class="stat-box">
          <h2>losses</h2>
          <p v-for="(game, index) in user.losses" :key="index">
            {{ game.year }} {{ game.difficulty }}
          </p>
        </div>
        <div class="stat-box">
          <h2>all</h2>
          <p v-for="(game, index) in user.numRaces" :key="index">
            {{ game.year }} {{ game.difficulty }}
          </p>
        </div>
      </div>
    </div>
    <div v-else style="text-align: center;">
      <p>User not found.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { users } from '../data/users';
  
  const route = useRoute();
  const username = route.params.username as string;
  
  const user = computed(() => users.find(u => u.name === username));
  </script>
  
  <style scoped>
  .service-record {
    width: 100%;
  }
  
  .stat-boxes {
    display: flex;
    flex-direction: row;
    /* Allow wrapping of items to the next line when space is insufficient */
    flex-wrap: wrap;
    /* Align items to the start (left) of the container */
    align-items: flex-start;
    /* Remove auto margins to prevent centering */
    margin-left: 0;
    margin-right: auto;
    /* Optional: Add some spacing between the boxes */
    gap: 0.6rem;
  }
  
  .stat-box {
    padding: 2rem;
    max-width: 200px;
    min-width: 150px; /* Ensure boxes don't collapse too much */
    border-radius: 20px;
    border: 1px solid rgba(161, 161, 161, 0.50);
    background: #0F1832;
    /* Ensure each box takes its natural width */
    flex-basis: auto;
    flex-grow: 0; /* Prevent boxes from growing to fill extra space */
    flex-shrink: 0; /* Prevent boxes from shrinking below their min-width */
  }
  </style>