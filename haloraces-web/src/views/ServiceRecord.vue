<template>
    <div class="service-record">
        <h1>Service Record: {{ user?.name }}</h1>

        <div v-if="user">
            <p>Races: {{ user.numRaces.length }}</p>
            <p>Wins: {{ user.wins.length }}</p>
            <p>Losses: {{ user.losses.length }}</p>
            <p>First Relay Race: {{ user.firstRelayRace.toDateString() }}</p>

            <div>
                <h2>Game Count</h2>
                <ul>
                    <li v-for="(count, game) in user.gameCount" :key="game">
                        {{ game }}: {{ count }}
                    </li>
                </ul>
            </div>
        </div>

        <div v-else>
            <p>User not found.</p>
        </div>
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
    padding: 2rem;
}
</style>