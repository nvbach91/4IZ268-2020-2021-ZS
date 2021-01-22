<template>
  <div class="timer">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      msg: "  ",
    };
  },
  created() {
    this.setTimer();
  },
  watch: {
    // call again the method if the route changes
    $route: "setTimer",
  },
  methods: {
    setTimer() {
      var date = new Date();
      date.setSeconds(date.getSeconds() + 10);
      var countDownDate = date.getTime();
      var x = setInterval(() => {
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        this.msg = seconds;

        if (distance <= 0) {
          clearInterval(x);
          this.msg = " ";
          this.$emit('timer-finished')
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.timer{
  text-align: center;
  min-height:2rem;
}
</style>