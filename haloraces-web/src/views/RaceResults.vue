<template>
  <div class="race-results">
    <h1 class="title">RACE RESULTS</h1>
    <div v-for="event in sortedRelayEvents" :key="event.year" class="event-card">
      <h2>{{
        new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }).replace(/(\w+) (\d+), (\d+)/, '$3 $1 $2')
      }} - {{ event.difficulty }}</h2>
      <p class="winner">
        🏆 WINNING TEAM:
        <span :class="teamClass(event.winningTeam)">{{ event.winningTeam }}</span>
      </p>

      <!-- Header row with team names -->
      <div class="game-results-grid" :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${1 + event.teamResults.length}, 1fr)`
      }">
        <strong></strong> <!-- Placeholder for game name column -->
        <strong v-for="team in event.teamResults" :key="team.name">{{ team.name }}</strong>
      </div>

      <!-- Game rows -->
      
      <div v-for="(game, index) in event.playedGames" :key="game" :class="['game-results-grid', index % 2 === 0 ? 'bg-black' : 'bg-blue']" :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${1 + uniqueTeamsForGame(event.playerResults, game).length}, 1fr)`
      }">
        <strong class = "game-name">{{ game }}</strong>
        <span v-for="player in playersForGame(event.playerResults, game)" :key="player.name">
          {{ player.name }}
        </span>
      </div>


      <!--
<div class="games-list">
        <div class="games-horizontal">
          <div class="game" v-for="game in event.playedGames" :key="game">
            <strong>{{ game }}</strong>
            <div class="players">
              <div v-for="player in playersForGame(event.playerResults, game)" :key="player.name + game"
                :class="['player-item', teamClass(player.team)]">
                {{ player.name }} ({{ player.team }}) <span v-if="player.win">✔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
-->

    </div>
  </div>
</template>


<script setup lang="ts">
import { relayEvents } from '../data/relayEvents'
import type { Game, PlayerResult, TeamName } from '../data/relayEvents'

const sortedRelayEvents = [...relayEvents].sort(
  (a, b) => b.date.getTime() - a.date.getTime()
)

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
</script>

<style scoped>
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
  padding-top: 32px;
  align-items: center;
}

.race-results {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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

.event-card {
  color: #f1f1f1;
  padding-top: 1.5rem;
  padding-bottom: 48px;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-radius: 20px;
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
  min-width: 200px;
  flex-shrink: 0;
}

.game-name{
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
    background-color: #2e7d32;
    color: #c8e6c9;
  }

  .gold-team {
    background-color: #bfa73f;
    color: #fff8e1;
  }

  .red-team {
    background-color: #c62828;
    color: #ffcdd2;
  }

  .blue-team {
    background-color: #1565c0;
    color: #bbdefb;
  }
}
</style>