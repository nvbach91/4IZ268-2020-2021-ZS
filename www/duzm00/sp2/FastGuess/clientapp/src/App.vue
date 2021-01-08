<template>
  <div id="app">
    <nav class="menu">
      <ul>
        <li>
          <router-link
            :to="{ path: '/score' }"
            v-bind:class="{ active: $route.path == '/score' }"
            >Scoreboard</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/game' }"
            v-bind:class="{ active: $route.path == '/game' }"
            >New game</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ path: '/' }"
            v-bind:class="{ active: $route.path == '/' }"
            >Rules</router-link
          >
        </li>
      </ul>
    </nav>
    <router-view class="app" />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
}
.active {
  background-color: black;
  color: white !important;
  padding: 0.5rem 1rem;
  text-decoration: none;
}
.loading {
position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
