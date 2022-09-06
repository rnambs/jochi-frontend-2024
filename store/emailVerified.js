import { BASE_URL } from "../assets/js/constants";

const state = {
    errorMessage: '',
    errorType: "",
    successMessage: "",
    successType: "",
    verifiedMessage: "",


}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
    async emilVerified({ commit }, payLoad) {
        try {
            const response = await this.$axios.$get(BASE_URL + `student/email_verified?unique_key=${payLoad.unique_key}`,)


            if (response.message == "Your email address has been verified successfully") {
                commit('setVerifiedMessage', "Your email address has been verified successfully, please set the password and complete the registration process from your mobile app");

            } else if (response.message == "Email is already verified") {
                commit('setVerifiedMessage', "Email is already verified");

            } else if (response.message == "data cannot be updated") {
                commit('setSuccessMessage', "");
                commit('setSuccessTypes', "");
                commit('setErrorMessage', "Data cannot be updated");
                commit('setErrorType', "error");
            }
            else if (response.message == "Key not found") {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "");
                commit('setErrorType', "");
                commit('setVerifiedMessage', "Email verification token is invalid");

            }
        }
        catch (e) {
            if (e.response && e.response.status == 400) {
                commit('setSuccessMessage', "");
                commit('setSuccessType', "");
                commit('setErrorMessage', "Invalid value");
                commit('setErrorType', "error");
            }
            else if (e.response && e.response.status == 401) {
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
    setVerifiedMessage(state, data) {
        state.verifiedMessage = data;
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
    verifiedMessage: () => {
        return state.verifiedMessage;
    },


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
