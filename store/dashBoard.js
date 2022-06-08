import { BASE_URL } from "../assets/js/constants";
const state = {
    dashBoardData: [],
    usersData: [],
    appointmentsData: [],
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async getDashBoard({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `admin/adminDashboard?filter=${payLoad.filterBy}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setdashBoardData', response.data);
            commit('setappointmentsData', response.appointments);
            commit('setusersData', response.users);
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
    setdashBoardData(state, data) {
        state.dashBoardData = data;
    },
    setusersData(state, data) {
        state.usersData = data;
    },
    setappointmentsData(state, data) {
        state.appointmentsData = data;
    },

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

}
const getters = {
    dashBoardData: () => {
        return state.dashBoardData;
    },
    usersData: () => {
        return state.usersData;
    },
    appointmentsData: () => {
        return state.appointmentsData;
    },

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

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
