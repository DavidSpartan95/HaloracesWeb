<template>
  <div class="hello">
    <div class="hello-box">
      <h1>Welcome to HaloRaces</h1>
      <div class="hello-breadtext">
        <p>
          Your official hub for tracking results and stats from community relay events hosted by the
          <a href="https://haloruns.com" target="_blank" rel="noopener noreferrer">HaloRuns.com</a> community.
        </p>

        <p>
          HaloRaces are thrilling, team-based speedrunning events where players from around the globe race through Halo
          campaigns. These epic relay events happen twice a year:
          the <strong>Easy Relay</strong> in the summer, and the intense <strong>Legendary Relay</strong> in the winter.
        </p>

        <p>
          This site features complete team results, individual performance stats, and game-by-game breakdowns. Whether
          you're a returning runner or new to the scene, dive in and explore the data behind the speedruns!
        </p>
      </div>
    </div>

    <!-- ✅ Chart Title -->
    <h2 class="chart-title">Team Wins Overview</h2>

    <div class="bar-chart">
      <div class="bar" v-for="team in teamWins" :key="team.name"
        :style="{ height: team.wins * scaleFactor + 'px', backgroundColor: team.color }">
        <span>{{ team.wins }}</span>
        <small>{{ team.name }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { TeamName, relayEvents } from '../data/relayEvents';

// Step 1: Get all team names you want to count
const allTeams = Object.values(TeamName);

// Step 2: Count wins for each team
const teamWins = computed(() =>
  allTeams.map(name => {
    const wins = relayEvents.filter(event => event.winningTeam === name).length;
    return {
      name,
      wins,
      color: getTeamColor(name),
    };
  })
);

// Step 3: Determine scale based on max wins
const maxWins = computed(() =>
  Math.max(...teamWins.value.map(team => team.wins))
);
const chartHeight = 400;
const scaleFactor = chartHeight / maxWins.value;

// Optional: team color helper
function getTeamColor(team: TeamName): string {
  switch (team) {
    case TeamName.Red:
      return 'red';
    case TeamName.Blue:
      return 'blue';
    case TeamName.Green:
      return 'green';
    case TeamName.Gold:
      return 'goldenrod';
    default:
      return 'gray';
  }
}


</script>

<style scoped>
.hello {
  display: flex;
  justify-content: center;
  /* horizontal centering */
  text-align: center;
  padding-top: 48px;
  /* keep your original top spacing */
}


.hello-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  max-width: 1120px;
  width: 100%;
  /* ✅ allow shrinking */
  padding: 24px;
  box-sizing: border-box;

  border-radius: 20px;
  border: 1px solid rgba(161, 161, 161, 0.50);
  background: #0F1832;
}


.hello-breadtext {
  text-align: left
}

.hello-breadtext a {
  color: #E08916;
  text-decoration: underline;
}

.hello-breadtext p {
  font-size: 0.95rem;
  /* slightly smaller text */
  line-height: 1.5;
}

.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  text-align: center;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;

  max-width: 1120px;
  width: 100%;
  height: 400px;
  padding: 48px;
  box-sizing: border-box;

  border-radius: 20px;
  border: 1px solid rgba(161, 161, 161, 0.50);
  background: #0F1832;

  margin-top: 24px;
}


.bar {
  width: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 6px 6px 0 0;
  transition: height 0.3s ease;
}

.bar span {
  position: absolute;
  top: -24px;
  color: white;
  font-weight: bold;
}

.bar small {
  margin-top: 6px;
  color: white;
  font-size: 0.8rem;
}

.chart-title {
  margin-top: 32px;
  margin-bottom: 8px;
  font-size: 1.5rem;
  color: white;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  flex: 1;
  background: #0F1832;
  padding-top: 48px;

  border-radius: 12px;
  border-left: 1px solid #444;
  position: relative;
}

.bar {
  width: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 6px 6px 0 0;
  transition: height 0.3s ease;
}

.bar span {
  position: absolute;
  top: -24px;
  color: white;
  font-weight: bold;
}

.bar small {
  margin-top: 6px;
  color: white;
  font-size: 0.8rem;
}
</style>
