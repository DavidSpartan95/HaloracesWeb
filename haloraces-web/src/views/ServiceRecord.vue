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
                    <h4>Result Summary</h4>
                    <p>Wins: {{ user.wins.length }}</p>
                    <p>Losses: {{ user.losses.length }}</p>
                    <p>Totall Races: {{ user.numRaces.length }}</p>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.5); margin: 0.5rem 0;" />
                    <h4>Play Count Per Game</h4>
                    <p v-for="(count, game) in user.gameCount" :key="game">
                        {{ game }}: {{ count }}
                    </p>
                    <h4>Teams Played For</h4>
                    <p>
                        Red Team: {{ countTeamAppearances(user.teams, TeamName.Red) }}
                    </p>
                    <p>
                        Blue Team: {{ countTeamAppearances(user.teams, TeamName.Blue) }}
                    </p>
                    <p>
                        Green Team: {{ countTeamAppearances(user.teams, TeamName.Green) }}
                    </p>
                    <p>
                        Gold Team: {{ countTeamAppearances(user.teams, TeamName.Gold) }}
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

                            <p :class="[ index % 2 === 0 ? 'bg-blue' : 'bg-black']">
                                {{
                                    new Date(game.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
                                }} - {{ game.difficulty }} - <span> {{ getUserTeamInEvent(user.name, game) }} </span>
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

                            <p :class="[ index % 2 === 0 ? 'bg-blue' : 'bg-black']">
                                {{
                                    new Date(game.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
                                }} - {{ game.difficulty }} - {{ gamesPlayedAtRaceAsString(user.name, game.playerResults)
                                }} - <span> {{ getUserTeamInEvent(user.name, game) }} </span>
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

                            <p :class="[index % 2 === 0 ? 'bg-blue' : 'bg-black']">
                                {{
                                    new Date(game.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
                                }} - {{ game.difficulty }} - <span> {{ getUserTeamInEvent(user.name, game) }} </span>
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
import { TeamName } from '../data/relayEvents';
import type { Game, PlayerResult, RelayEvent } from '../data/relayEvents';

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

function getUserTeamInEvent(username: string, event: RelayEvent): string  {
    const player = event.playerResults.find(p => p.name.toLowerCase() === username.toLowerCase())
    return player ? player.team.toString() : "Not found"
}

function gamesPlayedAtRaceAsString(
    username: string,
    results: PlayerResult[]
): string {
    // 1) find all PlayerResult entries for that user
    const entries = results.filter(p => p.name === username);
    if (entries.length === 0) return '';

    // 2) accumulate all playedGames without flatMap
    const allGames: Game[] = [];
    for (const entry of entries) {
        for (const g of entry.playedGames) {
            allGames.push(g);
        }
    }

    // 3) remove duplicates
    const uniqueGames = Array.from(new Set(allGames));

    // 4) return as comma‑separated string
    return uniqueGames.join(', ');
}

function countTeamAppearances(teams: TeamName[], team: TeamName): number {
    return teams.filter(t => t === team).length;
}

function teamColor(team: string) {
  switch (team) {
    case 'Green': return 'green-team'
    case 'Gold': return 'gold-team'
    case 'Red': return 'red-team'
    case 'Blue': return 'blue-team'
    default: return ''
  }
}

</script>

<style scoped>
/* Team Colors */
.green-team {
  color: #38F803;
}

.gold-team {
  color: #FFFF00;
}

.red-team {
  color: #FF3131;
}

.blue-team {
  color: #05b0ff;
}

.bg-blue {
    background: #0F1832;
}

.bg-black {
    background: #131313;
}

.service-record {
    padding: 1rem;
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
    max-height: none;
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