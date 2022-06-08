import { BASE_URL } from "../assets/js/constants";

const state = {
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {

  // password reset by email
  async invokeResetPassword({ commit }, payLoad) {
    try {
      const response = await this.$axios.$post(BASE_URL + 'auth/forgot_password_reset', payLoad)
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
      }
    }
  },
  async tokenValidate({ commit }, payLoad) {
    try {
      const response = await this.$axios.$get(BASE_URL + `users/token_verification?reset_password_token=${payLoad.reset_password_token}`,)

    } catch (e) {
      if (e.response && e.response.status == 401) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Reset password token is invalid");
        commit('setErrorType', "error");
      }

    }
  },

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
