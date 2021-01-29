import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from "@/pages/HomePage";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: '/homePage',
        name: 'HomePage',
        component: HomePage,
    },
];
const router = new VueRouter({
    routes
});

export default router