import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        currentTrip: Object,
    },

    getters: {
        currentTrip: state => {
            return state.currentTrip;
        },
    },

    mutations: {
        setCurrentTrip(state, trip) {
            state.currentTrip = trip;
        },
    },
});