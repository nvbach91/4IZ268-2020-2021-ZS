<template>
    <div class="score">
        <h2>ScoreBoard</h2>
        <hr />
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error"
             class="error">
            {{ error }}
        </div>
        <table>
            <tr>
                <th>Nickname</th>
                <th>Date</th>
                <th>Score</th>
            </tr>
            <tr v-for="user in data" v-bind:key="user.id">
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
                error: null
            };
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.getScore();
        },
        watch: {
            // call again the method if the route changes
            $route: "getScore",
        },
        methods: {
            getScore() {
                this.error = null;
                this.loading = true;

                fetch(this.$apiUrl + "/api/score", {
                    method: "GET", // or 'PUT'
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Success:", data);
                        this.loading = false;
                        this.data = data;
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
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