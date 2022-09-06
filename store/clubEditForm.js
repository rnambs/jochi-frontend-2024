import { BASE_URL } from "../assets/js/constants";

export const state = {
  clubDetails: [],
  schools: [],
  Teachers: [],
  Students: [],
  successMessage: "",
  SuccessType: "",
  errorMessage: "",
  errorType: "",
}
// const BASE_URL = "https://jochi-api.devateam.com/";

export const actions = {
  //   // club edit
  async updateClubs({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$put(BASE_URL + 'clubs/club_edit', payLoad, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setErrorMessage', "");
      commit('setErrorType', "");
      commit('setSuccessMessage', "Club Updated Successfully");
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
  //club details by id for editing
  async fetchClub({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'clubs/club_details?club_id=' + payLoad.id, {
        headers: {
          'Authorization': ` ${token}`
        },
      });
      commit('setClubDetails', response.data);

    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }

  },

  //school list for club adding form
  async getSchool({ commit }, payLoad) {

    const token = localStorage.getItem('token')
    try {
      const response = await this.$axios.$get(BASE_URL + 'schools/all_school', {
        headers: {
          'Authorization': ` ${token}`
        },

      });
      commit('setSchool', response.data);

    } catch (e) {
      if (e.response.data.message == "Unauthorized") {
        commit('setErrorMessage', "");
        commit('setErrorType', "");
        window.localStorage.clear();
        this.$router.push('/admin-login');
      }
    }
  },
  //student list for club
  async getStudents({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    const response = await this.$axios.$get(BASE_URL + `users/get_students?school_id=${payLoad.school_id}&studentId=${payLoad.studentId}`, {
      headers: {
        'Authorization': ` ${token}`
      },
    });
    commit('setStudentsList', response.data);


  },
  //teacher list for club
  async getTeacher({ commit }, payLoad) {
    const token = localStorage.getItem('token')
    const response = await this.$axios.$get(BASE_URL + `users/get_teachers?school_id=${payLoad.school_id}`, {
      headers: {
        'Authorization': ` ${token}`
      },
    });
    commit('setTeacherList', response.data);


  },

}
export const mutations = {
  setStudentsList(state, data) {
    state.Students = data;
  },
  setTeacherList(state, data) {
    state.Teachers = data;
  },

  setClubDetails(state, data) {
    state.clubDetails = data;

  },
  setSchool(state, data) {
    state.schools = data;

  },
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
export const getters = {
  Students: () => {
    return state.Students;
  },
  Teachers: () => {
    return state.Teachers;
  },

  clubDetails: () => {
    return state.clubDetails;
  },
  SuccessType: () => {
    return state.SuccessType;
  },
  errorMessage: () => {
    return state.errorMessage;
  },
  errorType: () => {
    return state.errorType;
  },

  schools: () => {
    return state.schools;
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
