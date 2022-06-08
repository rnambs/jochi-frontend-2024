import { BASE_URL } from "../assets/js/constants";

const state = {
  errorMessage: '',
  successMessage: '',
  errorType: "",
  SuccessType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

//forgot password email sent
const actions = {
  async forgotPassword({ commit }, payLoad) {
    try {
      const response = await this.$axios.$post(BASE_URL + 'auth/forgot_password_email_sent', payLoad)
      if (status = 200) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Successfully submit your request, Please verify your email");
        commit('setSuccessType', "success");
      }
    }
    catch (e) {
      commit('setSuccessMessage', "");
      commit('setSuccessType', "");
      commit('setErrorMessage', "User doesn't exist");
      commit('setErrorType', "error");
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
    state.SuccessType = data;

  },

}
const getters = {
  errorMessage: () => {
    return state.errorMessage;
  },
  successMessage: () => {
    return state.successMessage;
  },
  errorType: () => {
    return state.errorType;
  },
  SuccessType: () => {
    return state.SuccessType;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
