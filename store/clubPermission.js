import { BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: '',
    errorType: "",
    successMessage: "",
    successType: "",
}

const actions = {
    async setApprovalStatus({ commit }, payLoad) {
        try {
            const token = localStorage.getItem('token')
            const response = await this.$axios.$get(BASE_URL + `auth/approval_from_dean?club_id=${payLoad.clubId}&response=${payLoad.response}&token=${payLoad.token}`, {
                headers: {
                    'Authorization': ` ${token}`
                },
            });
            if (response.message) {

                commit('setSuccessMessage', response.message);
                commit('setSuccessType', "success");
            }

        } catch (e) {
            if (e.response.data.message == "Unauthorized") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/');
            } else if (e.response.data.message) {
                console.log(e)
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response.data.message);
                commit('setErrorType', 'error');
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
