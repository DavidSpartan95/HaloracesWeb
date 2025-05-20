<template>
  <div>

    <div v-if="selectedSort != 'new' && selectedSort != 'oldest'">
      <h3 class="win-counter"> {{ selectedSort.toUpperCase() }} TOTAL WINS {{ sortedRelayEvents.length }}</h3>

    </div>
    <h1 v-else class="title">RACE RESULTS</h1>

    <div class="sort">
      <div class="sort-controls">
        <label for="sort" class="sort-text">Sort by:</label>
        <select v-model="selectedSort" id="sort">
          <option value="new">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="red">Red Wins</option>
          <option value="green">Green Wins</option>
          <option value="blue">Blue Wins</option>
          <option value="gold">Gold Wins</option>
        </select>
      </div>
    </div>
    <div class="centered-container">
      <div v-for="(event, index) in sortedRelayEvents" :key="`${event.year}-${index}`" class="event-card"
        :id="`event-${formatDateForId(event.date)}`">
        <h2>{{
          new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
        }} - {{ event.difficulty }}</h2>
        <p class="winner">
          🏆 WINNING TEAM:
          <span :class="teamClass(event.winningTeam)">{{ event.winningTeam.toUpperCase() }}</span>
        </p>

        <!-- Header row with team names -->
        <div class="game-results-grid" :style="{
          display: 'grid',
          gridTemplateColumns: `repeat(${1 + event.teamResults.length}, 1fr)`
        }">
          <strong></strong> <!-- Placeholder for game name column -->
          <strong v-for="team in sortTeamResults(event.teamResults)" :key="team.name">{{ team.name }}</strong>
        </div>

        <!-- Game rows -->

        <div v-for="(game, index) in event.playedGames" :key="game"
          :class="['game-results-grid', index % 2 === 0 ? 'bg-black' : 'bg-blue']" :style="{
            display: 'grid',
            gridTemplateColumns: `repeat(${1 + uniqueTeamsForGame(event.playerResults, game).length}, 1fr)`
          }">
          <strong class="game-name">{{ game }}</strong>
          <span v-for="player in sortPlayerResults(playersForGame(event.playerResults, game))" :key="player.name">
            {{ player.name }}
          </span>
        </div>

        <div class="game-results-grid" :style="{
          display: 'grid',
          gridTemplateColumns: `repeat(${1 + event.teamResults.length}, 1fr)`
        }">
          <strong></strong> <!-- Placeholder for game name column -->
          <strong v-for="times in sortTeamResults(event.teamResults)" :key="times.name">{{ times.time }}</strong>
        </div>

      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { relayEvents } from '../data/relayEvents'
import type { Game, PlayerResult, TeamResult } from '../data/relayEvents'
import { TeamName } from '../data/relayEvents'
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

function sortTeamResults(results: TeamResult[]): TeamResult[] {
  const teamOrder: Record<TeamName, number> = {
    [TeamName.Red]: 0,
    [TeamName.Blue]: 1,
    [TeamName.Green]: 2,
    [TeamName.Gold]: 3
  };

  return results.sort((a, b) => {
    return teamOrder[a.name] - teamOrder[b.name];
  });
}

const selectedSort = ref('new');

const sortedRelayEvents = computed(() => {
  const base = [...relayEvents]; // safely cloned array

  switch (selectedSort.value) {
    case 'new':
      return base.sort((a, b) => b.date.getTime() - a.date.getTime());
    case 'oldest':
      return base.sort((a, b) => a.date.getTime() - b.date.getTime());
    case 'green':
      return base
        .filter(event => event.winningTeam === 'Green')
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    case 'red':
      return base
        .filter(event => event.winningTeam === 'Red')
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    case 'blue':
      return base
        .filter(event => event.winningTeam === 'Blue')
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    case 'gold':
      return base
        .filter(event => event.winningTeam === 'Gold')
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    default:
      return base;
  }
});

function formatDateForId(date: string | Date) {
  // turn “2025‑05‑15T12:00:00Z” (or Date) into “2025-05-15”
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}
function sortPlayerResults(results: PlayerResult[]): PlayerResult[] {
  const teamOrder: Record<TeamName, number> = {
    [TeamName.Red]: 0,
    [TeamName.Blue]: 1,
    [TeamName.Green]: 2,
    [TeamName.Gold]: 3
  };

  return results.sort((a, b) => {
    return teamOrder[a.team] - teamOrder[b.team];
  });
}
function playersForGame(playerResults: PlayerResult[], game: Game): PlayerResult[] {
  return playerResults.filter(player => player.playedGames.includes(game))
}
function uniqueTeamsForGame(playerResults: PlayerResult[], game: Game): TeamName[] {
  const teams = new Set(
    playerResults
      .filter(player => player.playedGames.includes(game))
      .map(player => player.team)
  );
  return Array.from(teams);
}

function teamClass(team: TeamName) {
  switch (team) {
    case 'Green': return 'green-team'
    case 'Gold': return 'gold-team'
    case 'Red': return 'red-team'
    case 'Blue': return 'blue-team'
    default: return ''
  }
}

const route = useRoute();

/**
 * If there's a hash, find the element and give it the
 * .flash-highlight class (removed automatically on animationend).
 */
function flashCard() {
  nextTick(() => {
    if (!route.hash) return;
    const el = document.querySelector(route.hash);
    if (el instanceof HTMLElement) {
      el.classList.add('flash-highlight');
      // remove after animation completes
      el.addEventListener(
        'animationend',
        () => el.classList.remove('flash-highlight'),
        { once: true }
      );
    }
  });
}

// run on first mount
onMounted(flashCard);
// run again whenever the hash changes
watch(() => route.hash, flashCard);
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* centers horizontally */
}

.bg-black {
  background: #131313;
}

.game-results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  width: 100%;
  font-size: 1.0rem;

  column-gap: 1rem;

  padding-bottom: 1rem;
  padding-top: 1rem;
  align-items: center;
}




.title {
  color: #FFF;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 630;
  line-height: 60px;
  letter-spacing: -0.96px;
  margin-bottom: 2rem;
}

.win-counter {
  color: #FFF;
  text-align: center;
  font-size: 38px;
  font-style: normal;
  font-weight: 630;
  width: 100%;
  letter-spacing: -0.96px;
}

.event-card {
  color: #f1f1f1;
  padding-top: 1.5rem;
  padding-bottom: 48px;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  border: 1px solid rgba(161, 161, 161, 0.50);
  background: #0F1832;
  text-align: center;
}

.winner {
  font-weight: bold;
  margin: 0.5rem 0 1rem;
}

.games-horizontal {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.game {
  border: 1px solid #1f1e1e;
  border-radius: 8px;
  padding: 0.75rem;
  flex-shrink: 0;
}

.game-name {
  color: #E08916;
}

.games-list {
  margin-top: 1rem;
}

.players {
  margin-left: 1rem;
}

.player-item {
  margin: 0.2rem 0;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
}

/* Team Colors - work in both themes */
.green-team {
  color: #38F803;
  font-weight: bold;
  font-size: large;
}

.gold-team {
  color: #FFFF00;
  font-weight: bold;
  font-size: large;
}

.red-team {
  color: #FF3131;
  font-weight: bold;
  font-size: large;
}

.blue-team {
  color: #05b0ff;
  font-weight: bold;
  font-size: large;
}

/* 🌙 Dark mode support */
@media (prefers-color-scheme: dark) {
  .event-card {
    background-color: #0F1832;
    color: #f1f1f1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  }

  .green-team {
    color: #38F803;
    font-weight: bold;
    font-size: large;
  }

  .gold-team {
    color: #FFFF00;
    font-weight: bold;
    font-size: large;
  }

  .red-team {
    color: #FF3131;
    font-weight: bold;
    font-size: large;
  }

  .blue-team {
    color: #05b0ff;
    font-weight: bold;
    font-size: large;
  }

  .sort {
    max-width: 1200px;
    width: 100%;
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
    padding: 12px 30px 12px 30px;
    /* extra right padding for arrow space */
    border-radius: 12px;
    border: none;

    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,0 10,0 5,6' fill='white'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px 8px;
  }

  /* define the flash keyframes (you can tweak colors/duration) */
  @keyframes flash-highlight {
    0% {
      box-shadow: 0 0 20px 10px rgba(255, 255, 0, 0.8);
    }

    100% {
      box-shadow: none;
    }
  }

  .flash-highlight {
    animation: flash-highlight 5s ease-out;
  }

}
</style>