import { BASE_URL } from "../assets/js/constants";

const state = {
  plannerList: [],
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  assignment: [],
  meetingList: [],
  sessionList: [],
  sharedSessionList: [],
  subjectsData: [],
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async getWeeklyPlanner({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/get_Plan?user_id=${payLoad.user_id}&type=${payLoad.type}&date=${payLoad.date}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setPlannerList', response.data);
      commit('setMeetingList', response.meeting);
      commit('setsessionList', response.session);
      commit('setSharedSessionList', response.shared_sessions);
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }


  },
  async getWeeklyPlannerFilter({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/get_filter?date=${payLoad.date}&type=${payLoad.plannerType}&filter=${payLoad.filter}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      // commit('setPlannerList', []);

      // commit('setMeetingList', []);

      // commit('setsessionList', []);

      // commit('setSharedSessionList', []);


      if (payLoad.filter == 'Assignments') {

        commit('setPlannerList', response.data[0]);
      }
      if (payLoad.filter == 'Meetings')
        commit('setMeetingList', response.data[0]);
      if (payLoad.filter == 'Session')
        commit('setsessionList', response.data[0]);
      if (payLoad.filter == 'Session')
        commit('setSharedSessionList', response.data[1]);
      commit('setMeetingList', []);

      commit('setsessionList', []);

      commit('setSharedSessionList', []);
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }


  },
  async addAssignment({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'planner/addAssignment', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Assignment added successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Assignment added successfully");
        commit('setSuccessType', "success");
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
      else if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "All fields are required ");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Please select an upcoming time") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please select an upcoming time");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "User Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User Not found");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Assignment already Exist") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Assignment already Exist");
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
  async getAssignment({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/get_assignments?id=${payLoad.id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setAssignmentList', response.data);
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/');
      }
      else {
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
      }
    }


  },
  async updateAssignment({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'planner/editAssignment', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.message == "Assignment updated successfully") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Assignment updated successfully");
        commit('setSuccessType', "success");
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
      else if (e.response.data.message == "Validation error") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "All fields are required ");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Please select an upcoming time") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Please select an upcoming time");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "User Not found") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "User Not found");
        commit('setErrorType', "error");
      }
      else if (e.response.data.message == "Assignment already Exist") {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', "Assignment already Exist");
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

  //subjectsList list
  async getSubjectsList({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/subjectsList`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setSubjectsList', response.data);
    } catch (e) {


      commit('setErrorMessage', e.response.data.message);
      commit('setErrorType', "error");
      commit('setSuccessMessage', "");
      commit('setSuccessType', "");


    }
  }


}
const mutations = {
  setPlannerList(state, data) {
    state.plannerList = data;
  },
  setMeetingList(state, data) {
    state.meetingList = data;
  },
  setsessionList(state, data) {
    state.sessionList = data;
  },
  setSharedSessionList(state, data) {
    state.sharedSessionList = data;
  },
  setAssignmentList(state, data) {
    state.assignment = data;
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
  setSubjectsList(state, data) {
    state.subjectsData = data;
  },

}
const getters = {
  plannerList: () => {
    return state.plannerList;
  },
  meetingList: () => {
    return state.meetingList;
  },
  sessionList: () => {
    return state.sessionList;
  },
  sharedSessionList: () => {
    return state.sharedSessionList;
  },
  assignment: () => {
    return state.assignment;
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
  subjectsData: () => {
    return state.subjectsData;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
