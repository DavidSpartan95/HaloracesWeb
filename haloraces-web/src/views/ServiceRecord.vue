<template>
    <div v-if="user" class="service-record">

        <div class="service-record-layout">
            <div class="record-sum">
                <div>
                    <h2>{{ user?.name }}</h2>
                    <h2>Service Record</h2>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <p>First Relay Race: {{ new Date(user.firstRelayRace).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2') }}</p>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <h4>Play Count Per Game</h4>
                    <p>Races: {{ user.numRaces.length }}</p>
                    <p>Wins: {{ user.wins.length }}</p>
                    <p>Losses: {{ user.losses.length }}</p>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <h4>Play Count Per Game</h4>
                    <p v-for="(count, game) in user.gameCount" :key="game">
                        {{ game }}: {{ count }}
                    </p>
                </div>
            </div>

            <div class="stat-layout">
                <div class="stat-box expandable" :class="{ 'open': openWins }">
                    <div style="display:flex; justify-content: space-between; align-items: center; width:100%;">
                        <h2>Wins</h2>
                        <button @click="toggleWins">
                            {{ openWins ? '-' : '+' }}
                        </button>
                    </div>

                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <div class="expandable-content">
                        <router-link v-for="(game, index) in user.wins" :key="index" :to="{
                            name: 'RaceResults',
                            hash: '#event-' + formatDateForId(game.date)
                        }" class="result-item-link">

                            <p :class="['result-item', index % 2 === 0 ? 'bg-blue' : 'bg-black']">
                                {{
                                    new Date(game.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
                                }} - {{ game.difficulty }}
                            </p>
                        </router-link>
                    </div>
                </div>

                <div class="stat-box expandable" :class="{ 'open': openLosses }">
                    <div style="display:flex; justify-content: space-between; align-items: center; width:100%;">
                        <h2>Losses</h2>
                        <button @click="toggleLosses">
                            {{ openLosses ? '-' : '+' }}
                        </button>
                    </div>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <div class="expandable-content">
                        <router-link v-for="(game, index) in user.losses" :key="index" :to="{
                            name: 'RaceResults',
                            hash: '#event-' + formatDateForId(game.date)
                        }" class="result-item-link">

                            <p :class="['result-item', index % 2 === 0 ? 'bg-blue' : 'bg-black']">
                                {{
                                    new Date(game.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
                                }} - {{ game.difficulty }}
                            </p>
                        </router-link>
                    </div>
                </div>

                <div class="stat-box expandable" :class="{ 'open': openAll }">

                    <div style="display:flex; justify-content: space-between; align-items: center; width:100%;">
                        <h2>All Races</h2>
                        <button @click="toggleAll">
                            {{ openAll ? '-' : '+' }}
                        </button>
                    </div>

                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <div class="expandable-content">
                        <router-link v-for="(game, index) in user.numRaces" :key="index" :to="{
                            name: 'RaceResults',
                            hash: '#event-' + formatDateForId(game.date)
                        }" class="result-item-link">

                            <p :class="['result-item', index % 2 === 0 ? 'bg-blue' : 'bg-black']">
                                {{
                                    new Date(game.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
                                }} - {{ game.difficulty }}
                            </p>
                        </router-link>
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

const openWins = ref(true);
const toggleWins = () => {
    openWins.value = !openWins.value;
};
const openLosses = ref(true);
const toggleLosses = () => {
    openLosses.value = !openLosses.value;
};
const openAll = ref(true);
const toggleAll = () => {
    openAll.value = !openAll.value;
};
function formatDateForId(date: string | Date) {
    // turn “2025‑05‑15T12:00:00Z” (or Date) into “2025-05-15”
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().slice(0, 10);
}
</script>

<style scoped>
.bg-blue {
    background: #0F1832;
}

.bg-black {
    background: #131313;
}

.result-item {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding-bottom: 1rem;
    padding-top: 1rem;

}

.service-record {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding-top: 2rem;
}

.stat-layout {
    flex: 1;
    /* take all remaining width */
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    align-items: stretch;
}

.service-record-layout {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* allows wrapping */
    gap: 0.6rem;
    height: 30rem;

}

.record-sum {
    padding: 2rem;
    min-width: 200px;
    border-radius: 20px;
    border: 1px solid rgba(161, 161, 161, 0.50);
    background: #0F1832;
    align-self: flex-start;

}

.record-sum p {
    color: #E08916
}

.stat-box {
    padding: 0rem;
    max-width: 1200px;
    min-width: 300px;
    border-radius: 20px;
    border: 1px solid rgba(161, 161, 161, 0.50);
    background: #0F1832;
    flex-basis: auto;
    flex: 1 1 auto;

}

.stat-box p {
    padding: 0.5rem;
    padding-left: 1rem;
    color: #E08916;
}

.stat-box h2 {
    padding-left: 1rem;
}

.stat-box button {
    padding-right: 1rem;
    padding-left: 1rem;
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
    padding-bottom: 1rem;
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

@media (max-width: 607px) {
    .record-sum {
        padding: 2rem;
        max-width: 1200px;
        min-width: 200px;
        border-radius: 20px;
        border: 1px solid rgba(161, 161, 161, 0.50);
        background: #0F1832;
        align-self: flex-start;
        flex-basis: auto;
        flex: 1 1 auto;

    }
}
</style>