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
            path: "/",
            component: Home
        },
        {
            path: "/game",
            component: Game
        },
        {
            path: "/score",
            component: ScoreBoard
        },
        {
            path: "/score/new",
            component: ScoreBoardNew
        }
    ]
})