<template>
  <nav>
    <div class="navbar">
      <div class="nav-left">
        <img src="../assets/race-icon-modified.png" alt="Logo" class="nav-img" />
      </div>

      <div class="nav-center">
        <router-link to="home" class="nav-link">Home</router-link>
        <router-link to="runners" class="nav-link">Runners</router-link>
        <router-link to="race-results" class="nav-link">Race Results</router-link>
      </div>

      <div class="nav-right">
        <!-- Spacer to balance the image on the left -->
      </div>
    </div>
  </nav>
</template>

  
  <script setup lang="ts">
  // No logic needed
  </script>
  
  <style scoped>
  .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width:100%;
  
  height: 96px;
  margin: 0 auto;
  border-radius: 100px;
  border: 1px solid rgba(161, 161, 161, 0.5);
  background: #0f1832;
  box-sizing: border-box;
}

.nav-left,
.nav-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-right {
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
  flex-shrink: 0;
  aspect-ratio: 1/1;
}

.nav-link {
  color: #E08916;
  font-weight: bold;
  font-size: 1.1rem;
  font-style: normal;
  text-decoration: none;
}

.nav-link:hover {
  color: #d8b74a;
  text-decoration: underline;
}
  </style>
  