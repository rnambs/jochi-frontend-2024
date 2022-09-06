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
  async getPassword({ commit }, payLoad) {

    try {
      const response = await this.$axios.$post(BASE_URL + 'users/user_forgot_password_update', payLoad)
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "Password Updated Successfully");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Provide Valid Token");
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
      } else if (e.response && e.response.status == 401) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }

    }
  },
  // reset password for user
  async getResetPassword({ commit }, payLoad) {

    try {

      const response = await this.$axios.$post(BASE_URL + 'users/user_reset_password', payLoad);


      if (response.message == 'Password updated successfully') {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Password Updated Successfully");
        commit('setSuccessType', "success");
      }

    } catch (e) {

      if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "All fields are required ");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Incorrect password") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Incorrect password");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "mismatch password and confirm password") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "mismatch password and confirm password");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Password not updated") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Password not updated");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "No user found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "No user found");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Current password is incorrect") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Current password is incorrect");
        commit('setErrorType', "error");
      }
      else {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
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
