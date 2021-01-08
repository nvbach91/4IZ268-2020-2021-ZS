<template>
  <div>
    <h2>Congratulations 🎉,</h2>
      <h3>you reached ~{{score}} points! Now you can submit your score.</h3>
    <hr />
    <form @submit.prevent="submitScore" class="new_score_form">
      <label>Nickname</label>
      <input required type="text" v-model="nickname" />
      <button type="submit">Submit</button>
      <div v-if="error" class="error">
        <hr/>
        <p>{{ error }}</p>
        <p>Please try a <router-link :to="{path:'game'}">New game</router-link></p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: "",
      error: null,
      score: 0
    };
  },
  created(){

    //calculate score
    this.score = Math.round(window.localStorage.getItem("score"),0);

  },
  methods: {
    submitScore() {
      //pictures json
      var pictures = window.localStorage.getItem("pictures");
      var id = window.localStorage.getItem("id");

      if (pictures === undefined) {
        this.$router.push("/");
      }

      const data = {
        id: id,
        nickname: this.nickname,
        answers: JSON.parse(pictures),
        date: null,
      };

      console.log(data);

      fetch(this.$apiUrl + "/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push("/score");
          } else {
            this.error = "Something went wrong :(";
          }
        })
        .catch((error) => {
          console.error(error)
        });
    },
  },
};
</script>

<style scoped>
.new_score_form {
  margin-top: 1rem;
}
.error{
  color: red;
}
</style>