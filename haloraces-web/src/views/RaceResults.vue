<template>
  <div class="race-results">
    <h1 class="title">Race Results</h1>
    <div
      v-for="event in relayEvents"
      :key="event.year"
      class="event-card"
    >
      <h2>{{ event.year }} - {{ event.difficulty }}</h2>
      <p class="winner">
        🏆 Winning Team:
        <span :class="teamClass(event.winningTeam)">{{ event.winningTeam }}</span>
      </p>

      <div class="games-list">
        <h3>Games Played:</h3>
        <div class="games-horizontal">
          <div
            class="game"
            v-for="game in event.playedGames"
            :key="game"
          >
            <strong>{{ game }}</strong>
            <div class="players">
              <div
                v-for="player in playersForGame(event.playerResults, game)"
                :key="player.name + game"
                :class="['player-item', teamClass(player.team)]"
              >
                {{ player.name }} ({{ player.team }}) <span v-if="player.win">✔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { relayEvents } from '../data/relayEvents'
  import type { Game, PlayerResult, TeamName } from '../data/relayEvents'
  
  function playersForGame(playerResults: PlayerResult[], game: Game): PlayerResult[] {
    return playerResults.filter(player => player.playedGames.includes(game))
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
.race-results {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}

.event-card {
  background-color: #1e1e2f;
  color: #f1f1f1;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: background-color 0.3s, color 0.3s;
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
  background: #1a1a1a;
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
  background-color: #a5d6a7;
  color: #1b5e20;
}
.gold-team {
  background-color: #fff176;
  color: #795548;
}
.red-team {
  background-color: #ef9a9a;
  color: #b71c1c;
}
.blue-team {
  background-color: #90caf9;
  color: #0d47a1;
}

/* 🌙 Dark mode support */
@media (prefers-color-scheme: dark) {
  .event-card {
    background-color: #1e1e2f;
    color: #f1f1f1;
    box-shadow: 0 2px 6px rgba(0,0,0,0.6);
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