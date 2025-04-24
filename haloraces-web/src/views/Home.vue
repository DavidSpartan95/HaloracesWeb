<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Welcome to HaloRaces</h1>
      <p>
        Your official hub for tracking results and stats from community relay events hosted by the 
        <a href="https://haloruns.com" target="_blank" rel="noopener noreferrer">HaloRuns.com</a> community.
      </p>

      <p>
        HaloRaces are thrilling, team-based speedrunning events where players from around the globe race through Halo campaigns. These epic relay events happen twice a year:
        the <strong>Easy Relay</strong> in the summer, and the intense <strong>Legendary Relay</strong> in the winter.
      </p>

      <p>
        This site features complete team results, individual performance stats, and game-by-game breakdowns. Whether you're a returning runner or new to the scene, dive in and explore the data behind the speedruns!
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero {
  background: linear-gradient(145deg, #1f1f1f, #292929);
  padding: 3rem 2rem;
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 1000px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.hero h1 .highlight {
  color: #00bfff;
}

.hero p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0;
}

.hero a {
  color: #00bfff;
  text-decoration: none;
  font-weight: bold;
}

.hero a:hover {
  text-decoration: underline;
}
</style>
