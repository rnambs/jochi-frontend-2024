
import { BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
    mySession: [],

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {

    async getMySession({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `studyRoom/mySession`, {
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
    // setEmail(state, data) {
    //     state.Email = data;
    // },


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
    // Email: () => {
    //     return state.Email;
    // },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
