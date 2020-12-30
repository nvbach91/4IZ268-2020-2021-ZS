<template>
  <div class="score">
    <h1>ScoreBoard</h1>
    <hr />
    <div
      v-if="loading"
      class="loading"
    >Loading...</div>
    <table>
      <tr>
        <th>Nickname</th>
        <th>Date</th>
        <th>Score</th>
      </tr>
      <tr
        v-for="user in data"
        v-bind:key="user.id"
      >
        <td>{{ user.nickname }}</td>
        <td>
          {{
            new Date(user.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          }}
        </td>
        <td>{{ user.score }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.getScore();
  },
  watch: {
    $route: "getScore",
  },
  methods: {
    getScore() {
      fetch(this.$apiUrl + "/api/score", {
        method: "GET", // or 'PUT'
      })
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.score {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
</style>