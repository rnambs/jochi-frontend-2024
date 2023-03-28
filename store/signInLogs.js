import { BASE_URL } from "../assets/js/constants";

const state = {
    logs: [],
    logCount: 0,
    successMessage: "",
    successType: "",
    schoolCount: "",
    errorMessage: "",
    errorType: "",
}
const actions = {

    async getLogs({ commit }, payLoad) {
        const token = localStorage.getItem('token')

        try {
            const response = await this.$axios.$get(BASE_URL + `admin/login_logs?limit=${payLoad.limit}&offset=${payLoad.offset}&from_date=${payLoad.fromDate}&to_date=${payLoad.toDate}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setLogs', response.data[0].rows);
            commit('setLogCount', response.data[0].count);
        } catch (e) {
            if (e.response && e.response.status == 401) {
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }
        }
    },


}
const mutations = {

    setLogs(state, data) {
        state.logs = data;

    },
    setLogCount(state, data) {
        state.logCount = data;

    },
    setsuccessMessage(state, data) {
        state.successMessage = data;
    },
    setsuccessType(state, data) {
        state.successType = data;
    },
    seterrorMessage(state, data) {
        state.errorMessage = data;
    },
    seterrorType(state, data) {
        state.errorType = data;
    },

}
const getters = {

    logs: () => {
        return state.logs;
    },
    logCount: () => {
        return state.logCount;
    },
    successMessage: () => {
        return state.successMessage;
    },
    successType: () => {
        return state.successType;
    },
    errorMessage: () => {
        return state.errorMessage;
    },
    errorType: () => {
        return state.errorType;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
