import { BASE_URL } from "../assets/js/constants";

const state = {
  successMessage: "",
  SuccessType: "",
  errorMessage: "",
  errorType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

//forgot password email sent
const actions = {
  async passwordReset({ commit }, payLoad) {

    try {
      const response = await this.$axios.$post(BASE_URL + 'users/user_forgot_password_email_sent', payLoad)

      if (response.message == "User status is inactive, So please contact the admin") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Your account is inactive please contact the admin");
        commit('setErrorType', "error");
      }
      else if (response.message == "User doesn't exist") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User doesn't exist");
        commit('setErrorType', "error");
      }
      else if (response.message == "Your profile is not verified") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Your profile is not verified");
        commit('setErrorType', "error");
      } else {

        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Successfully submit your request, Please verify your email");
        commit('setSuccessType', "success");
      }
    } catch (e) {
      if (e.response && e.response.status == 401) {
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
  setSuccessMessage(state, data) {
    state.successMessage = data;

  },
  setSuccessType(state, data) {
    state.SuccessType = data;

  },
  setErrorMessage(state, data) {
    state.errorMessage = data;

  },
  setErrorType(state, data) {
    state.errorType = data;

  },

}
const getters = {
  SuccessType: () => {
    return state.SuccessType;
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

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
