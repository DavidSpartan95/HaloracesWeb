<template>
    <nav>
        <div class="navbar-background"></div>

        <div class="nav-content">
            <div class="navbar-text">
                <div>
                    <img src="../assets/race-icon-modified.png" alt="Logo" height="50" width="50" />
                </div>
                <router-link to="/home" class="nav-link">Home</router-link>
                <router-link to="/raceResults" class="nav-link">Race Results</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
// No logic needed
</script>

<style scoped>
.navbar-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;

    background-color: #1e1e2f;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    z-index: 0;
}

.nav-content {
    position: fixed;
    top: 0;
    width: 100%;
    height: 75px; /* match navbar background */
    display: flex;
    align-items: center; /* center vertically */
    justify-content: center; /* optional: center horizontally */
    z-index: 10;
}

.navbar-text {
  width: 100%;
  max-width: 100%; /* Don’t constrain more than needed */
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
    color: #bfa450;
    font-weight: bold;
    font-size: 1.125rem;
    text-decoration: none;
    transition: color 0.2s ease;
}

.nav-link:hover {
    color: #d8b74a;
    text-decoration: underline;
}
</style>