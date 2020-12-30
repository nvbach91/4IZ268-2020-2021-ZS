<template>
  <div class="game">
    <div v-if="loading" class="loading">Loading...</div>

    <div
      v-if="error"
      class="error"
    > 
      {{ error }}
    </div>

    <div
      v-if="picture"
      class="content"
    >
      <Timer
        :key="timerKey"
        v-on:timer-finished="getNextPicture"
      />
      <Picture
        v-bind:picture="picture"
        v-on:answer-selected="getNextPicture"
      />
    </div>
  </div>
</template>

<script>
import Picture from "@/components/Picture";
import Timer from "@/components/Timer.vue";
export default {
  data() {
    return {
      loading: false,
      picture: null,
      error: null,
      startTime: null,
      timerKey: 0,
    };
  },
  components: {
    Timer,
    Picture,
  },
  created() {
    this.data = { UserAnswersIds: [] };
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    forceRerenderTimer() {
      this.timerKey += 1;
    },
    getTimeElapsed() {
      var endTime = performance.now();
      var timeDiff = endTime - this.startTime; //in ms
      console.log(timeDiff);
      return timeDiff;
    },
    getNextPicture(selectedAnswerText) {
      if (this.data.UserAnswersIds.length < 5) {
        var data = {};
        data.QuestionId = this.picture.id;
        if (selectedAnswerText === undefined) selectedAnswerText = "";
        data.Answer = selectedAnswerText;
        data.msElapsed = this.getTimeElapsed();
        this.data.UserAnswersIds.push(data);
        this.fetchData();
        this.forceRerenderTimer();
      } else {
        window.localStorage.setItem("pictures", JSON.stringify(this.data));
        this.$router.push("/score/new");
      }
    },
    fetchData() {
      this.error = null;
      this.loading = true;

      fetch(this.$apiUrl + "/api/picture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.loading = false;
          this.picture = data;
          this.startTime = performance.now();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
<style scoped>
.game {
  max-width: 50rem;
}
.timer {
  justify-content: center;
  justify-items: center;
  align-items: center;
}
</style>
