<template>
  <div id="app">
    <nav class="menu">
      <a href="/score" v-bind:class="{ active: $route.path == '/score' }"
        >Scoreboard</a
      >
      <a href="/game" v-bind:class="{ active: $route.path == '/game' }"
        >New game</a
      >
      <a href="/" v-bind:class="{ active: $route.path == '/' }">Rules</a>
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
h1 {
  text-align: center;
}
.menu {
  display: flex;
  width: 100%;
  justify-content: space-around;
  justify-items: baseline;
  align-items: baseline;
}
.app {
  width: 50%;
  align-items: center;
  align-self: center;
}
.active {
  background-color: black;
  color: white !important;
  padding: 0.5rem 1rem;
  text-decoration: none;
}
.loading {
  text-align: center;
}
</style>
