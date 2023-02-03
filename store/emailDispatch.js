import { BASE_URL } from "../assets/js/constants";

const state = {
    schools: [],
    successMessage: "",
    successType: "",
    schoolCount: "",
    errorMessage: "",
    errorType: "",
}
const actions = {


    async sendEmail({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$post(BASE_URL + 'admin/send-marketing-email', payLoad, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            commit('setSuccessMessage', response.message);
            commit('setSuccessType', "success");
            commit('setErrorMessage', "");
            commit('setErrorType', "");
        } catch (e) {
            if (e.response && e.response.status == 401) {
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }
            else {
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', "error");
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
            }
        }
    },



}
const mutations = {

    setSchool(state, data) {
        state.schools = data;

    },
    setschoolCount(state, data) {
        state.schoolCount = data;

    },
    setSuccessMessage(state, data) {
        state.successMessage = data;
    },
    setSuccessType(state, data) {
        state.successType = data;
    },
    setErrorMessage(state, data) {
        state.errorMessage = data;
    },
    setErrorType(state, data) {
        state.errorType = data;
    },

}
const getters = {

    schools: () => {
        return state.schools;
    },
    schoolCount: () => {
        return state.schoolCount;
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
