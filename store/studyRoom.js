
import { BASE_URL } from "../assets/js/constants";

const state = {
  errorMessage: "",
  errorType: "",
  successMessage: "",
  successType: "",
  timerStatusData: [],
  subjectsData: [],
  studyTypesData: [],
  studySessions: [],
  assignments: []
}
// const BASE_URL = "https://jochi-api.devateam.com/";

const actions = {
  //Get current status of timer
  async getStatusTimer({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/resumeTimer`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.status == true) {
        commit('setStatusTimer', response.data);

      } else {
        commit('setStatusTimer', 'ended');

      }
    } catch (e) {

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

    }
  },


  //subjectsList list
  async getStudyTypes({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/studyTypes`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setStudyTypes', response.data);
    } catch (e) {

    }
  },

  //   // club edit
  async startStudySession({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'studyRoom/startSession', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "Session has started!");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }

      else if (e.response && e.response.status == 409) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
      else if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
    }
  },

  async addStudyTime({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'studyRoom/addStudyTime', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "Ended the timer!");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }

      else if (e.response && e.response.status == 409) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
      else if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
    }
  },

  async addRating({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'studyRoom/addRating', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "Rating saved successfully!");
      commit('setSuccessType', "success");
    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }

      else if (e.response && e.response.status == 409) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
      else if (e.response && e.response.status == 400) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.data.message);
        commit('setErrorType', "error");
      }
    }
  },

  //Get all configured study sessions list
  async getStudySessions({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/get_all_study_session`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.status == true) {
        commit('setStudySessions', response.data);

      } else {
        commit('setStatusTimer', 'ended');

      }
    } catch (e) {

    }
  },
  //Get all assignments list
  async getAssignments({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/get_all_assignments`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.status == true) {
        if (response.data && response.data.length > 0) {
          response.data.forEach(e => {
            e.due_date = moment(e.due_date).format("MM/DD/YY")
          })
        }
        commit('setAssignments', response.data);

      } else {
        commit('setStatusTimer', 'ended');

      }
    } catch (e) {

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
  setSubjectsList(state, data) {
    state.subjectsData = data;
  },
  setStudyTypes(state, data) {
    state.studyTypesData = data;
  },
  setStatusTimer(state, data) {
    state.timerStatusData = data;
  },
  setStudySessions(state, data) {
    state.studySessions = data;
  },
  setAssignments(state, data) {
    state.assignments = data;
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
  subjectsData: () => {
    return state.subjectsData;
  },
  studyTypesData: () => {
    return state.studyTypesData;
  },
  timerStatusData: () => {
    return state.timerStatusData;
  },
  studySessions: () => {
    return state.studySessions;
  },
  assignments: () => {
    return state.assignments;
  },



}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
