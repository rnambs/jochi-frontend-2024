import { BASE_URL } from "../assets/js/constants";

const state = {
  agendaList: [],
  teachers: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async listTeacherAgenda({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `meeting/request/list_agenda?teacher_id=${payLoad.teacher_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      commit('setAgendaList', response.data);

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
  async teacherMeetingList({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `meeting/request/list_meeting_request?teacher_id=${payLoad.teacher_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setTeacherList', response.data);
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
        commit('setErrorMessage', "Invalid Value");
        commit('setErrorType', "error");
      }
      else if (response.message == "data cannot be updated") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Data cannot be updated");
        commit('setErrorType', "error");
      }
      else if (response.message == "Id not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Invalid meeting ID or already accepted/rejected meeting request");
        commit('setErrorType', "error");
      }
      else if (response.message == "Meeting request has been rejected successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Meeting request has been rejected successfully");
        commit('setSuccessType', "success");

      }
      else if (response.message == "Meeting request has been accepted successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Meeting request has been accepted successfully");
        commit('setSuccessType', "success");

      }
      else if (response.message == "Student not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Student not found");
        commit('setErrorType', "error");

      }
      else if (response.message == "Time Expired") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Meeting request link is expired");
        commit('setErrorType', "error");

      }
    } catch (e) {

      if (e.response.data.message) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }

    }


  },

}
const mutations = {
  setAgendaList(state, data) {
    state.agendaList = data;
  },
  setTeacherList(state, data) {
    state.teachers = data;
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
  agendaList: () => {
    return state.agendaList;
  },
  teachers: () => {
    return state.teachers;
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
