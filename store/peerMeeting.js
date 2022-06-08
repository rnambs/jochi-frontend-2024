import { BASE_URL } from "../assets/js/constants";

const state = {
  students: [],
  studentsSchedule: [],
  timeZones: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async getStudents({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `users/get_students?school_id=${payLoad.school_id}&studentId=${payLoad.studentId}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setStudentsList', response.data);
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
  async updateStudentTimeSchedule({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'peer/meetings/peer_time_schedule', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setStudentSchedule', response.data);
      commit('setTimeZone', response.timeZone);
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
  async scheduleConfirm({ commit }, payLoad) {


    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + '/peer/meetings/schedule_peer_meeting', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid Value");
        commit('setErrorType', "error");
      }
      else if (response.message == "User Not Found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User Not Found");
        commit('setErrorType', "error");
      }

      else if (response.message == "Please give a valid slot id") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please give a valid slot id");
        commit('setErrorType', "error");

      }

      else if (response.message == "You have already scheduled a meeting") {

        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "You have already scheduled a meeting");
        commit('setErrorType', "error");

      }

      else if (response.message == "Success") {

        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Your meeting request submitted successfully");
        commit('setSuccessType', "error");

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
  setStudentsList(state, data) {
    state.students = data;
  },
  setTimeZone(state, data) {
    state.timeZones = data;
  },
  setStudentSchedule(state, data) {
    state.studentsSchedule = data;
  },
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
  students: () => {
    return state.students;
  },
  timeZones: () => {
    return state.timeZones;
  },
  studentsSchedule: () => {
    return state.studentsSchedule;
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
