
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
  assignmentSessions: [],
  sharedSessions: [],
  assignments: [],
  sessionData: {},
  invitedPeers: [],
  ownerDetail: []
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
  //   start study session
  async saveStudySession({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$post(BASE_URL + 'studyRoom/invite_peers', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      if (response.data) {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        commit('setSuccessMessage', "Session has started!");
        commit('setSuccessType', "success");
        commit('setSessionData', response.data)
      }
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
      else if (e.response && e.response.error) {
        commit('setSuccessMessage', "");
        commit('setSuccessType', "");
        commit('setErrorMessage', e.response.error);
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
      const response = await this.$axios.$get(BASE_URL + `studyRoom/get_scheduled_sessions`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      // if (response.data) {
      //   if (response.data && response.data > 0) {
      //     response.data.forEach((e) => {
      //       e["date"] = moment(e.date).format("MMMM Do, YYYY");
      //     });

      let sessions = [];
      sessions.concat(response.assignment_session, response.shared_sessions, response.study_session)
      commit('setStudySessions', response.study_session);
      commit('setSharedSessions', response.shared_sessions);
      commit('setAssignmentSessions', response.assignment_session);
      // }

      //   } else {
      // commit('setStatusTimer', 'ended');

      // }
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
  // Get invited peers
  async getInvitedPeers({ commit }, id) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + `studyRoom/shared_peers_list?session_id=${id}`, {
        headers: {
          'Authorization': ` ${token}`
        },
      });

      commit('setInvitedPeers', response.members);
      commit('setOwnerDetail', response.owner);

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
  setAssignmentSessions(state, data) {
    state.assignmentSessions = data;
  },
  setSharedSessions(state, data) {
    state.sharedSessions = data;
  },
  setAssignments(state, data) {
    state.assignments = data;
  },
  setSessionData(state, data) {
    state.sessionData = data;
  },
  setInvitedPeers(state, data) {
    state.invitedPeers = data;
  },
  setOwnerDetail(state, data) {
    state.ownerDetail = data;
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
  assignmentSessions: () => {
    return state.assignmentSessions;
  },
  sharedSessions: () => {
    return state.sharedSessions;
  },
  assignments: () => {
    return state.assignments;
  },
  sessionData: () => {
    return state.sessionData;
  },
  invitedPeers: () => {
    return state.invited;
  },
  ownerDetail: () => {
    return state.ownerDetail;
  },


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
