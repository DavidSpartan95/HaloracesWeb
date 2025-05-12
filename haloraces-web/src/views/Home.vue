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
  </div>

</template>

<script setup lang="ts">
</script>

<style scoped>

.hello {
  display: flex;
  justify-content: center; /* horizontal centering */
  text-align: center;
  padding-top: 48px; /* keep your original top spacing */
}


.hello-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;

  max-width: 1120px;
  width: 100%;          /* ✅ allow shrinking */
  padding: 48px;
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

</style>
