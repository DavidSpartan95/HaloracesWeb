<template>
  <nav class="nav">

    <div class="navbar">

      <div class="nav-left">
        <img src="../assets/race-icon-modified.png" alt="Logo" class="nav-img" />
      </div>

      <div class="nav-center">
        <router-link to="home" class="nav-link">Home</router-link>
        <router-link to="runners" class="nav-link">Runners</router-link>
        <router-link to="race-results" class="nav-link">Race Results</router-link>
      </div>

      <div class="nav-img">
        <!-- Spacer to balance the image on the left -->
      </div>

      <div class="nav-left-hamburger">
        <button class="hamburger" @click="toggleSidebar" aria-label="Menu">
          &#9776;
        </button>
      </div>

    </div>

    <div v-if="sidebarOpen" class="sidebar">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <router-link to="home" class="sidebar-link" @click="toggleSidebar">Home</router-link>
      <router-link to="runners" class="sidebar-link" @click="toggleSidebar">Runners</router-link>
      <router-link to="race-results" class="sidebar-link" @click="toggleSidebar">Race Results</router-link>
    </div>
  </nav>
</template>



<script setup lang="ts">
import { ref } from 'vue';

const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>


<style scoped>
button {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
}

.nav {}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  height: 96px;
  margin: 0 auto;
  border-radius: 100px;
  border: 1px solid rgba(161, 161, 161, 0.5);
  background: #0f1832;
  box-sizing: border-box;
}

.nav-left,

.nav-left-hamburger {
  flex: 0;
  display: flex;
  align-items: center;
}

.nav-left-hamburger {
  justify-content: flex-end;
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-img {
  width: 48px;
  height: 48px;
  aspect-ratio: 1/1;
}

.nav-link {
  color: #E08916;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
}

.nav-link:hover {
  color: #d8b74a;
  text-decoration: underline;
}

.hamburger {
  font-size: 2rem;
  background: none;
  border: none;
  color: #E08916;
  cursor: pointer;
  display: none;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 240px;
  height: 100%;
  background: #0f1832;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  text-align: end;
  gap: 1.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.sidebar-link {
  color: #E08916;
  text-decoration: none;
  font-size: 1.2rem;
}

.sidebar-link:hover {
  text-decoration: underline;
  color: #d8b74a;
}

.close-btn {
  align-self: flex-end;
  font-size: 2rem;
  background: none;
  border: none;
  color: #E08916;
  cursor: pointer;
}

@media (max-width: 635px) {
  .nav {
    position: sticky;
    top: 0;
  }

  .nav-center {
    display: none;
  }

  .hamburger {
    display: block;
  }
}
</style>
