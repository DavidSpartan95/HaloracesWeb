<template>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        {{ user.name }} - Wins: {{ user.wins }}
      </li>
    </ul>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { users } from '../data/users'; // import the User interface
  
  </script>
  