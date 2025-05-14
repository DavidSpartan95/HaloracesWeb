<template>
    <div v-if="user" class="service-record">
        <h3>{{ user?.name }}</h3>

        <div class="service-record-layout">
            <div class="record-sum">
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
            <div class="stat-layout">
                <div class="stat-box expandable" :class="{ 'open': openWins }">
                    <h2>wins</h2>
                    <button @click="toggleWins">
                        {{ openWins ? '-' : '+' }}
                    </button>
                    <div class="expandable-content">
                        <p v-for="(game, index) in user.wins" :key="index">
                            {{ game.year }} {{ game.difficulty }}
                        </p>
                    </div>
                </div>
                <div class="stat-box expandable" :class="{ 'open': openLosses }">
                    <h2>losses</h2>
                    <button @click="toggleLosses">
                        {{ openLosses  ? '-' : '+' }}
                    </button>
                    <div class="expandable-content">
                        <p v-for="(game, index) in user.losses" :key="index">
                            {{ game.year }} {{ game.difficulty }}
                        </p>
                    </div>

                </div>
                <div class="stat-box expandable" :class="{ 'open': openAll }">
                    <h2>all</h2>
                    <button @click="toggleAll">
                        {{ openAll ? '-' : '+' }}
                    </button>
                    <div class="expandable-content">
                        <p v-for="(game, index) in user.numRaces" :key="index">
                            {{ game.year }} {{ game.difficulty }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else style="text-align: center;">
        <p>User not found.</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { users } from '../data/users';

const route = useRoute();
const username = route.params.username as string;

const user = computed(() => users.find(u => u.name === username));

const openWins = ref(false);
const toggleWins = () => {
    openWins.value = !openWins.value;
};
const openLosses = ref(false);
const toggleLosses = () => {
    openLosses.value = !openLosses.value;
};
const openAll = ref(false);
const toggleAll = () => {
    openAll.value = !openAll.value;
};
</script>

<style scoped>
.service-record {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-layout {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    margin-right: auto;
    gap: 0.6rem;
    align-items: center;
    /* centers horizontally */
}

.service-record-layout {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* allows wrapping */
    height: 30rem;

}

.record-sum {
    padding: 2rem;
    max-width: 200px;
    min-width: 200px;
    border-radius: 20px;
    border: 1px solid rgba(161, 161, 161, 0.50);
    background: #0F1832;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
}

.stat-box {
    padding: 2rem;
    max-width: 900px;
    min-width: 600px;
    border-radius: 20px;
    border: 1px solid rgba(161, 161, 161, 0.50);
    background: #0F1832;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;

}

.expandable button {
    margin-left: auto;
    /* Push button to the right */
    cursor: pointer;
    font-size: 1.2rem;
    border: none;
    background: transparent;
    color: white;
}

.expandable-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    /* Smooth vertical expand/collapse */
    margin-top: 1rem;
}

.expandable.open .expandable-content {
    max-height: 500px;
    /* Adjust this value based on the expected content height */
}

.expandable-content p {
    margin-bottom: 0.5rem;
}

@media (min-width: 1300px) {
    .service-record-layout {
        width: 1300px;
        display: flex;
        flex-direction: row;
    }
}
</style>