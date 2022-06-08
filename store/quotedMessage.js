import { BASE_URL } from "../assets/js/constants";

const state = {
  id: '',
  viewed: '',
  quoteMessage: '',
  successMessage: "",
  successType: "",
  errorMessage: "",
  errorType: "",
  plannerList: [],
  assignment: [],
  meetingList: [],
  subjectsData: [],

}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  async getQuotedMessage({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'quotes/motivational_quotes_update', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      commit('setSuccessMessage', "Quotes Message Updated");
      commit('setSuccessType', "success");

    } catch (e) {
      if (e.response && e.response.status == 401) {
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
  async showQuotedMessage({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('id')
    try {
      const response = await this.$axios.$get(BASE_URL + `quotes/get_motivational_quote?user_id=${user_id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setQuoteMessage', response.data.quote);
      commit('setViewed', response.data.isQuoteViewed);
    } catch (e) {
      if (e.response && e.response.status == 401) {
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
  async getDailyPlanner({ commit }, payLoad) {
    try {
      const token = localStorage.getItem('token')
      const response = await this.$axios.$get(BASE_URL + `planner/get_Plan?user_id=${payLoad.user_id}&type=${payLoad.type}&date=${payLoad.date}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setPlannerList', response.data);
      commit('setMeetingList', response.meeting);
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
      commit('setSuccessType', "")

    }
  },


}
const mutations = {
  setUserId(state, data) {
    state.id = data;
    localStorage.setItem('id', data);
  },
  setPlannerList(state, data) {
    state.plannerList = data;
  },
  setMeetingList(state, data) {
    state.meetingList = data;
  },
  setAssignmentList(state, data) {
    state.assignment = data;
  },
  setQuoteMessage(state, data) {
    state.quoteMessage = data;
  },
  setViewed(state, data) {
    state.viewed = data;
  },
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
  setSubjectsList(state, data) {
    state.subjectsData = data;
  },
}
const getters = {

  id: () => {
    return state.id;
  },
  plannerList: () => {
    return state.plannerList;
  },
  meetingList: () => {
    return state.meetingList;
  },
  assignment: () => {
    return state.assignment;
  },
  quoteMessage: () => {
    return state.quoteMessage;
  },
  viewed: () => {
    return state.viewed;
  },
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
