import { BASE_URL } from "../assets/js/constants";

const state = {
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {

  // password set by email
  async getPassword({ commit }, payLoad) {
    try {
      const response = await this.$axios.$post(BASE_URL + 'student/student_password_set', payLoad)
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "Password Updated Successfully");
      commit('setSuccessType', "success");
      this.$router.push("/");
    } catch (e) {
      if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Provide valid token");
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
        commit('setErrorMessage', "Set password token is invalid");
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
