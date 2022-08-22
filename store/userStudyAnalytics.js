
import { BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
    mySession: [],
    goal: {},

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {

    async getMySession({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            let endpoint = 'studyRoom/mySession'
            if (payLoad.student_id) {
                endpoint += `?student_id=${payLoad.student_id}`
            }
            const response = await this.$axios.$get(BASE_URL + endpoint, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setMySession', response);
            // commit('setappointmentsData', response.appointments);
            // commit('setusersData', response.users);
        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }
    },

    //Set daily study goa;
    async setGoal({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {

            const response = await this.$axios.$post(BASE_URL + 'studyRoom/set_daily_goals', payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            if (response.message) {
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
            }
        } catch (e) {
            if (e.response.data.error) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.data.error);
                commit('setErrorType', "error");
            }
        }
    },

    // get configured goal
    async getGoal({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            let endpoint = 'studyRoom/get_daily_goals'
            if (payLoad.student_id) {
                endpoint += `?student_id=${payLoad.student_id}`
            }
            const response = await this.$axios.$get(BASE_URL + endpoint, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setGoal', response.data);

        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            }
        }
    },


}
const mutations = {
    setErrorMessage(state, data) {
        state.errorMessage = data;
    },
    setErrorType(state, data) {
        state.errorType = data;
    },
    setSuccessMessage(state, data) {
        state.successMessage = data;
    },
    setSuccessType(state, data) {
        state.successType = data;
    },
    setMySession(state, data) {
        state.mySession = data;
    },
    setGoal(state, data) {
        state.goal = data;
    },


}
const getters = {
    errorMessage: () => {
        return state.errorMessage;
    },
    errorType: () => {
        return state.errorType;
    },
    successMessage: () => {
        return state.successMessage;
    },
    successType: () => {
        return state.successType;
    },
    mySession: () => {
        return state.mySession;
    },
    goal: () => {
        return state.goal;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
