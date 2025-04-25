<template>
    <div class="modal-overlay" v-if="active">
      <div class="modal-content">
        <button @click="$emit('close')">Close</button>
        <h2>{{active.name}}</h2>
        <p><strong>Wins:</strong> {{ active.wins.length }}</p>
        <p><strong>Losses:</strong> {{ active.losses.length }}</p>
        <p><strong>Total Races:</strong> {{ active.numRaces }}</p>
        <p><strong>First Relay Race:</strong> {{ active.firstRelayRace.toLocaleDateString() }}</p>
        <div>
          <h3>Games Played</h3>
          <ul>
            <li v-for="(count, game) in active.gameCount" :key="game">{{ game }}: {{ count }} games</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { User } from '../data/users';
  
  const props = defineProps<{
    active: User | null;
  }>();
  
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: rgb(19, 16, 41);
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    text-align: left;
  }
  </style>
  