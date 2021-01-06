<template>
  <div id="app">
    <nav class="menu">
      <ul>
        <li><a href="/score" v-bind:class="{ active: $route.path == '/score' }">Scoreboard</a></li>
        <li><a href="/game" v-bind:class="{ active: $route.path == '/game' }">New game</a></li>
        <li><a href="/" v-bind:class="{ active: $route.path == '/' }">Rules</a></li>
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
}
.active {
  background-color: black;
  color: white !important;
  padding: 0.5rem 1rem;
  text-decoration: none;
}
</style>
