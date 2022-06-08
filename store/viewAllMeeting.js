import { BASE_URL } from "../assets/js/constants";

const state = {
    allList: [],
    allData: [],
    timeZones: [],
    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async listAllMeeting({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `view/all/list_all_meeting?student_id=${payLoad.student_id}&search_id=${payLoad.search_id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAllList', response.data);
            commit('setTimeZone', response.timeZone);
        } catch {
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
    async getAll({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `view/all/get_student_and_teacher?user_id=${payLoad.user_id}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setAllData', response.data);
        } catch {
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
    setAllList(state, data) {
        state.allList = data;
    },
    setTimeZone(state, data) {
        state.timeZones = data;
    },
    setAllData(state, data) {
        state.allData = data;
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
    allList: () => {
        return state.allList;
    },
    allData: () => {
        return state.allData;
    },
    timeZones: () => {
        return state.timeZones;
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
