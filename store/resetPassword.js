import { BASE_URL } from "../assets/js/constants";

const state = {
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";
const actions = {
  async getResetPassword({ commit }, payLoad) {
    const token = localStorage.getItem('token')

    try {
      const response = await this.$axios.$post(BASE_URL + 'auth/reset_password', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
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

        commit('setErrorMessage', "Invalid Password");
        commit('setErrorType', "error");
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
