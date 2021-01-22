<template>
  <div>
    <h2>Welcome to Fast Guess</h2>
    <hr />
    <p>Fast guess is a game with fast questions and even faster answers</p>
    <p>
      To answer each question you have 10 seconds. You have 3 answers to choose
      from. Total score is based on answer correctnes and how fast the answer is
      given.
    </p>
    <p>
      To answer each question even faster you can use <code>X</code>, <code>C</code> and <code>V</code> keys on your keyboard.
    </p>
    <div class="begin">
      <h3>Let's begin :)</h3>
      <router-link :to="{path:'game'}">New game</router-link>
    </div>
  </div>
</template>
<style scoped>
.begin {
  text-align: center;
}


</style>