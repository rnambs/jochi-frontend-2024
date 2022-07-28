import { BASE_URL } from "../assets/js/constants";

const state = {
    successMessage: "",
    successType: "",
    errorMessage: "",
    errorType: "",
}
const actions = {

    // login using gg4l
    async loginUsingGg4l({ commit }, payLoad) {
        try {
            const response = await this.$axios.$post(BASE_URL + 'auth/gg4l_passport_auth', payLoad)
            console.log("login request", response)
            commit('setErrorMessage', "");
            commit('setErrorType', "");
            commit('setSuccessMessage', "Password Updated Successfully");
            commit('setSuccessType', "success");
        } catch (e) {
            if (e.response && e.response.status == 401) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                window.localStorage.clear();
                this.$router.push('/admin-login');
            }

            else if (e.response && e.response.status == 400) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "Reset password token is invalid");
                commit('setErrorType', "error");
            } else if (e.response) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', e.response);
                commit('setErrorType', "error");
            }
        }
    }

}
const mutations = {
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
