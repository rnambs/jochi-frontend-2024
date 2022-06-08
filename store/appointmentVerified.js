import { BASE_URL } from "../assets/js/constants";

const state = {

  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",

}

const actions = {


  async teacherMeetingConfirm({ commit }, payLoad) {
    const token = localStorage.getItem('token')


    try {
      const response = await this.$axios.$post(BASE_URL + 'meeting/request/respond_to_meeting_request', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
        this.$router.push("/teacher-appointment");
      }
      else if (response.message == "Logged user doesn't have permission to accept/reject the request") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Logged user doesn't have permission to accept/reject the request");
        commit('setErrorType', "error");
        this.$router.push("/");

      }
      else if (response.message == "data cannot be updated") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
        this.$router.push("/teacher-appointment");
      }
      else if (response.message == "Id not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid meeting ID or already accepted/rejected meeting request");
        commit('setErrorType', "error");
        this.$router.push("/teacher-appointment");
      }
      else if (response.message == "Meeting request has been rejected successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Meeting request has been rejected successfully");
        commit('setSuccessType', "success");
        this.$router.push("/teacher-appointment");
      }
      else if (response.message == "Meeting request has been accepted successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Meeting request has been accepted successfully");
        commit('setSuccessType', "success");
        this.$router.push("/teacher-appointment");
      }
      else if (response.message == "Student not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Oops! Something went wrong. Please try again later");
        commit('setErrorType', "error");
        this.$router.push("/teacher-appointment");

      }

      else if (response.message == "Time Expired") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Meeting request link is expired");
        commit('setErrorType', "error");
        this.$router.push("/teacher-appointment");
      }
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
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
