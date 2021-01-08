import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home"
import Game from "@/views/Game"
import ScoreBoard from "@/views/ScoreBoard"
import ScoreBoardNew from "@/views/ScoreBoardNew"

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            name: "home",
            path: "/",
            component: Home
        },
        {
            name: "game",
            path: "/game",
            component: Game
        },
        {
            name: "score",
            path: "/score",
            component: ScoreBoard
        },
        {
            name: "scoreNew",
            path: "/score/new",
            component: ScoreBoardNew
        }
    ]
})