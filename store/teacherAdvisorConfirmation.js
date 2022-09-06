import { BASE_URL } from "../assets/js/constants";

const state = {

    errorMessage: "",
    errorType: "",
    successMessage: "",
    successType: "",

}

const actions = {


    async teacherAdvisorConfirm({ commit }, payLoad) {
        const token = localStorage.getItem('token')
        try {
            const response = await this.$axios.$get(BASE_URL + `teacher/respond_to_advisor_request?teacher_id=${payLoad.teacher_id}&advisor_request=${payLoad.response}&advisor_token=${payLoad.token}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });

            if (response.message) {
                commit('setSuccessMessage', response.message);
                commit('setSuccessType', success);
                commit('setErrorMessage', "");
                commit('setErrorType', "");
            }
        } catch (e) {
            if (e.response?.data?.message) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response?.data?.message);
                commit('setErrorType', "error");
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

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
