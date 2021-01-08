<template>
  <div class="game">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="picture" class="content">
      <Timer :key="timerKey" v-on:timer-finished="getNextPicture" />
      <Picture v-bind:picture="picture" v-on:answer-selected="getNextPicture" />
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
      score: 0,
    };
  },
  components: {
    Timer,
    Picture,
  },
  created() {
    this.data = { UserAnswersIds: [] };
    window.localStorage.setItem("id", this.uuidv4());
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },

    forceRerenderTimer() {
      //comporent refresh
      this.timerKey += 1;
    },

    getTimeElapsed() {
      var endTime = performance.now();
      var timeDiff = endTime - this.startTime; //in ms
      console.log(timeDiff);
      return timeDiff;
    },

    getNextPicture(selectedAnswer) {
      if (this.data.UserAnswersIds.length < 5) {
        var data = {};
        data.QuestionId = this.picture.id;
        if (selectedAnswer === undefined) {
          selectedAnswer.answerText = "";
        }
        
        data.Answer = selectedAnswer.answerText;
        data.msElapsed = this.getTimeElapsed();

        if (selectedAnswer.isCorrect) {
          this.score += 10000 / data.msElapsed;
          window.localStorage.setItem("score", this.score );
        }

        this.data.UserAnswersIds.push(data);
        this.fetchData();
        this.forceRerenderTimer();
        this.saveApproximateScore();
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
